// An adjacency list graph
//
class Node<T> {
    value: T;
    children: Node<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

class Graph<T> {
    nodes: Node[];

    constructor() {
        this.nodes = [];
    }

    // Add/remove
    //
    addNode(value: T): Node<T> {
        this.hasNode(value) && throw new Error("Node already exists");
        const node = new Node(value);
        this.nodes.push(node);
        return node;
    }

    removeNode(value: T): void {
        !this.hasNode(value) && return;
        const index = this.getNodeIndex(value);
        this.nodes.splice(index, 1);
    }

    addEdge(from: T, to: T): void {
        const index = this.getNodeIndex(from);
        this.nodes[index].children.push(to);
    }

    removeEdge(from: T, to: T): void {
        !this.hasNode(from) && return;
        const edges = this.getEdges(from);
        for (let j = 0; j < edges.length; j++) {
            if (edges[j] === to) {
                this.nodes[index].children.splice(j, 1);
            }
        }
    }

    // Seach
    //
    getNode(value: T): Node<T> {
        const index = this.getNodeIndex(value);
        return this.nodes[index];
    }

    getEdges(value: T): Node<T>[] {
        const index = this.getNodeIndex(value);
        return this.nodes[index].children;
    }

    getNodeIndex(value: T): number {
        !this.hasNode(value) && throw new Error("Node does not exists");
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].value === value) {
                return i;
            }
        }
    }

    // Helper methods
    //
    size(): number {
        return this.nodes.length;
    }

    clear(): void {
        this.nodes.splice(0, this.nodes.length - 1);
        return;
    }

    hasNode(value: T): boolean {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].value === value) {
                return true;
            }
        }
        return false;
    }

    hasEdge(from: T, to: T): boolean {
       const children = this.getEdges(from);
       for (let j = 0; j < children.length; j++) {
           if (children[j] === to) {
               return true;
           }
       }
       return false;
    }
}

export { Graph, Node }
