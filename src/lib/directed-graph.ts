// Simple directed graph implementation in Typescript
//
class directedGraph<T> {
    private nodes: Map<T, Set<T>> = new Map();

    addNode(value: T): void {
        if (this.nodes.has(value)) {
            throw new Error("Node already exists");
        }
        this.nodes.set(value, new Set<T>());
    }

    removeNode(value: T): void {
        // Delete all references to value
        for (const set of this.nodes.values()) {
            set.delete(value);
        }

        // Delete the node itself
        this.nodes.delete(value);
    }

    addEdge(from: T, to: T): void {
      if (from === to) {
          throw new Error("Nodes cannot point to themselves");
      }

      if (!this.nodes.has(from) && !this.nodes.has(to)) {
          throw new Error("Must have nodes in graph to create edge");
      }

      // Get sets
      const toChildren = this.nodes.get(to);
      const fromChildren = this.nodes.get(from);

      // Make sure both nodes exist
      if (!fromChildren || !toChildren) {
          throw new Error("Both nodes must exist in graph to create edge");
      }

      // Check if there's already an edge
      if (fromChildren.has(to) || toChildren.has(from)) {
          throw new Error("Edge already exists");
      }

      this.nodes.set(from, fromChildren.add(to));
    }

    removeEdge(from: T, to: T): void {
        let fromChildren = this.nodes.get(from);
        if (!fromChildren) {
            throw new Error("Node does not exist");
        }

        fromChildren.delete(to);
    }

    getNodes(): Map<T, Set<T>> {
        return this.nodes;
    }

    getChildren(node: T): Set<T> | undefined {
        if (!this.nodes.has(node)) {
            throw new Error("Node does not exist");
        }
        return this.nodes.get(node);
    }

    // Printing functions
    toString(): string {
        const lines: string[] = [];
        for (const [node, edges] of this.nodes.entries()) {
            const edgeList = Array.from(edges).join(", ");
            lines.push(`${node} -> [${edgeList}]`);
        }
        return lines.join("\n");
    }
}

const graph = new directedGraph<string>();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addEdge("C", "B");
graph.addEdge("B", "A");
graph.addEdge("A", "C");
graph.removeEdge("A", "C");
graph.removeNode("A");
console.log(graph.toString());
