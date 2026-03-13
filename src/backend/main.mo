import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type GenerationEntry = {
    id : Nat;
    prompt : Text;
    colorScheme : Text;
    layoutStyle : Text;
    timestamp : Int;
    title : Text;
  };

  module GenerationEntry {
    public func compareByTimestampDesc(a : GenerationEntry, b : GenerationEntry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let generations = Map.empty<Nat, GenerationEntry>();
  var nextId = 0;

  public shared ({ caller }) func saveGeneration(prompt : Text, colorScheme : Text, layoutStyle : Text, title : Text) : async Nat {
    let id = nextId;
    let entry : GenerationEntry = {
      id;
      prompt;
      colorScheme;
      layoutStyle;
      timestamp = Time.now();
      title;
    };
    generations.add(id, entry);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getHistory() : async [GenerationEntry] {
    generations.values().toArray().sort(GenerationEntry.compareByTimestampDesc);
  };

  public shared ({ caller }) func deleteGeneration(id : Nat) : async Bool {
    if (not generations.containsKey(id)) {
      Runtime.trap("Entry with provided ID does not exist");
    };
    generations.remove(id);
    true;
  };

  public query ({ caller }) func getGeneration(id : Nat) : async ?GenerationEntry {
    generations.get(id);
  };
};
