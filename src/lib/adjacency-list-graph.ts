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
    nodes: Node<T>[];

    constructor() {
        this.nodes = [];
    }

    // Add/remove
    //
    addNode(value: T): void {
        const node = new Node(value);
        this.nodes.push(node);
    }

    addNodes(arr: T[]): void {
        for (const a of arr) {
            this.addNode(a);
        }
    }

    removeNode(value: T): void {
        if (!this.hasNode(value)) return;
        const index = this.getNodeIndex(value);
        if (index !== null) {
            this.nodes.splice(index, 1);
        }
    }

    addEdge(start: T, end: T): void {
        const node = this.hasNode(end) ? this.getNode(end) : new Node(end);
        const index = this.getNodeIndex(start);
        if (index === null) {
            throw new Error(`${start} is not a node`);
        }
        this.nodes[index].children.push(node!);
    }

    removeEdge(start: T, end: T): void {
        if (!this.hasNode(start)) return;
        const index = this.getNodeIndex(start);
        const edges = this.getEdges(start);
        if (edges !== null) {
            for (let j = 0; j < edges.length; j++) {
                if (edges[j] === end) {
                    this.nodes[index!].children.splice(j, 1);
                }
            }
        }
    }

    // Seach
    //
    getNode(value: T): Node<T> | null {
        const index = this.getNodeIndex(value);
        if (index !== null) {
            return this.nodes[index];
        }
        return null;
    }

    getEdges(value: T): Node<T>[] | null {
        const index = this.getNodeIndex(value);
        if (index !== null) {
            return this.nodes[index].children;
        }
        return null;
    }

    getNodeIndex(value: T): number | null {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].value === value) {
                return i;
            }
        }
        return null;
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

    hasEdge(start: T, end: T): boolean {
       const edges = this.getEdges(start);
       if (edges !== null) {
           for (let j = 0; j < edges.length; j++) {
               if (edges[j] === end) {
                   return true;
               }
           }
       }
       return false;
    }
}

export { Graph, Node }
