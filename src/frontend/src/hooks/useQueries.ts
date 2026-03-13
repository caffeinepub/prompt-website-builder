import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetHistory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveGeneration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      prompt,
      colorScheme,
      layoutStyle,
      title,
    }: {
      prompt: string;
      colorScheme: string;
      layoutStyle: string;
      title: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveGeneration(prompt, colorScheme, layoutStyle, title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useDeleteGeneration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteGeneration(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
