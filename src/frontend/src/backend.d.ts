import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GenerationEntry {
    id: bigint;
    title: string;
    layoutStyle: string;
    timestamp: bigint;
    prompt: string;
    colorScheme: string;
}
export interface backendInterface {
    deleteGeneration(id: bigint): Promise<boolean>;
    getGeneration(id: bigint): Promise<GenerationEntry | null>;
    getHistory(): Promise<Array<GenerationEntry>>;
    saveGeneration(prompt: string, colorScheme: string, layoutStyle: string, title: string): Promise<bigint>;
}
