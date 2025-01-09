// Find a route between two nodes
//
// Implement DFS to find the route between two nodes.
//
// 3 -> 7, 6, 8
// 1 -> 3, 5
// 2 -> 1, 8
// 6 -> 4
//
// Input: 1, 4
// Output: 1 -> 3 -> 6 -> 4
// Because 1 points to 3 which points to 4
//
// It'll start by taking the first node then seaching each of its child nodes. At each node check, we mark that it's been visited to avoid entering an infinite loop.
//
// Flow:
// + create a set to store numbers that have been visited and a route to store our output
// + seach the graph, recursively checking each child node, and each of _its_ children before returning to the next child node of the root node.
// + include an additional check to know when you've reached each point between the two input points. Store each point in a separate array.
// + pass route array to a print function as output.
//
import { Graph, Node } from "../lib/adjacency-list-graph";

function findRoute(start: number, end: number): string {
    const visited: Set<number> = new Set();
    const route: number[] = [];

    if (graph.nodes === null) {
        return "Graph is empty";
    }

    // Outer loop, checking whether any root nodes match the start of our route
    for (const n of graph.nodes) {
        if (n.value === start) {
            if (extractRoute(n, [])) {
                return printRoute();
            }
        }
    }

    // Print the route, if found
    function printRoute(): string {
        let result = `${route[0]}`
        for (let i = 1; i < route.length; i++) {
	      		result += ` -> ${route[i]}`
        }
        return result;
    }

    // Inner recursive loop that hunts for the path
    function extractRoute(root: Node<number>, tempPath: number[] = []): boolean {
        if (root === null) return false;

        visited.add(root.value);
        tempPath.push(root.value);

        if (root.value === end) {
            // Found target - copy successful path to main route
            route.push(...tempPath);
            return true;
        }

        if (root.children) {
            for (const child of root.children) {
                if (!visited.has(child.value)) {
                    if (extractRoute(child, tempPath)) {
                        return true; // Propagate success up
                    }
                }
            }
        }

        // Backtrack - remove this node from temp path as this route didn't work
        tempPath.pop();
        return false;
    }

    // False case
    return `No route found between ${start} and ${end}`;
}

// Test cases
const graph = new Graph<number>();
const nodeValues = [1, 2, 3, 4, 5, 6, 7, 8]
graph.addNodes(nodeValues);
graph.addEdge(3, 7);
graph.addEdge(3, 6);
graph.addEdge(3, 8);
graph.addEdge(1, 3);
graph.addEdge(1, 5);
graph.addEdge(2, 1);
graph.addEdge(2, 8);
graph.addEdge(6, 4);
console.log(findRoute(2, 4));
