// 4.1 Route between nodes
//
// Given a directed graph, write an algo to find out if there's a route between two nodes.
//
// Implement a directed graph, define a Graph class and ensure nodes only point one way.
// Given two node numbers, check whether there's a route between them.
//
// e.g.
// Directed graph:
// 0: 2
// 1: 0
// 2: 3
// 3: 1
//
// Input:
// from: 2, to: 1
// Algo checks whether 2 points to 1, if yes produce true
// Else, produce false
//
import { DirectedGraph } from "../lib/directed-graph";

function hasDirectRoute(node1: number, node2: number): string {
    const oneToTwo = containsChild(node2, graph.getChildren(node1));
    const twoToOne = containsChild(node1, graph.getChildren(node2));

    const result = oneToTwo ? `${node1} -> ${node2}` : twoToOne ? `${node2} -> ${node1}` : "No route";

    function containsChild(node: number, set: Set<number> | undefined): boolean {
        const result = !set ? false : set.has(node) ? true : false;
        return result;
    }

    return result;
}

// Test
const graph = new DirectedGraph<number>();
const nodeValues = [5, 8, 2, 43, 1, 10, 59, 83, 19]
graph.addNodes(nodeValues);
graph.addEdge(8, 83);
graph.addEdge(5, 1);
graph.addEdge(2, 1);
console.log(hasDirectRoute(83, 8));
console.log(hasDirectRoute(2, 10));
console.log(hasDirectRoute(2, 1));
