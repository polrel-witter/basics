// Build order
//
// Given a list of projects and dependencies, output a build order list so that the project can successfully compile. if no valid build order return an error.
//
// e.g.
// Input:
//    projects: a, b, c, d, e, f
//    deps: (a, d), (f, b), (b, d), (f, a), (d, c)
// Output: f, b, a, d, c, e
//
//    f       e
//   / \
//  b   a
//   \ /
//    d
//    |
//    c
//
// d -> [ a, b ] : a and b must be built before d
// b -> [ f ]    : f must be built before b
// a -> [ f ]    : f must be built before a
// c -> [ d ]    : d must be built before c
// e -> []       : e can be built whenever
//
// Approach:
// So we have an output list - our build order - whose order may be adjusted at each new node we reach.
// We could implement depth-first search, which would mean in the above example: we hunt for a's deps, then b's deps, which is both f. so from the first iteration we know the build order begins with f, b, a, d
// We recurse, and since b and a have been visited, we skip. Next is c which prompts us to hunt for node d which has been visted so we can simply add c to the end of the build order because whatever d is dependent upon is already in the list.
// Finally, we get to e which has no deps so we simply add to the end.
// Thus: f, b, a, d, c, e
//
// Error detection: if, for example, d contained c, it should throw a build error because we've entered a loop where d depends on c which depends on d. So to catch this, at each new lookup we check whether a dep is equal to 'current' node. If so, produce an error message.
//
// While the approach above would work, there's a more efficent standard algo called Kahn's algo which takes the following steps:
//  1. Start with nodes that have in-degree 0 (can be built immediately)
//  2. After building a node, remove its edges, reducing in-degree of its dependents
//  3. Any node whose in-degree becomes 0 is now ready to build
//
// So:
// a -> [ d ]
// b -> [ d ]
// c -> []
// d -> [ c ]
// e -> []
// f -> [ a, b ]
//
// d(2), c(1), a(1), b(1), f(0), e(0)
//
// Flow:
// + populate the in-degree queue by iterating over the graph, incrementing each node within the queue
// + add all nodes with in-degree 0 to the queue. e.g. [f, e]
// + hunt for e's children, which is empty so do nothing
// + hunt for f's children and decrement their in-degrees: a = 0, b = 0; so [f, e, a, b]
// + hunt for b's children and dec: d = 1
// + hunt for a's children and dec: d = 0; so [f, e, a, b, d]
// + hunt for c's children and dec: c = 0; so [f, e, a, b, d, c]
//
import { Graph, Node } from "../lib/adjacency-list-graph";

function getBuildOrder(graph: Graph<string>): string[] | string {
    const inDegrees: Map<string, number> = new Map();
    const queue: string[] = [];
    const result: string[] = [];

      // Initialize all nodes to 0 in-degrees first
      for (const n of graph.nodes) {
          inDegrees.set(n.value, 0);
      }

      // Then increment in-degrees for nodes with incoming edges
      for (const n of graph.nodes) {
          for (const child of n.children || []) {
              inDegrees.set(child.value, inDegrees.get(child.value)! + 1);
          }
      }

    // Add nodes with 0 in-degrees to queue
    for (const [node, degree] of inDegrees) {
        if (degree === 0) {
            queue.push(node);
        }
    }

    // Process queue
    while (queue.length > 0) {
        const current = queue.shift()!;
        result.push(current);

        // Find the node object to get its children
        const edges: Node<string>[] | null = graph.getEdges(current);
        if (edges === null) result.push(current);
        for (const child of edges!) {
            const newDegree = inDegrees.get(child.value)! - 1;
            inDegrees.set(child.value, newDegree);
            if (newDegree === 0) {
                queue.push(child.value);
            }
        }
    }

    // Check if we processed all nodes (no cycles)
    return result.length === inDegrees.size ? result : "Error: cycle detected";
}


// Test cases
const graph = new Graph<string>();
const nodeValues = ['a', 'b', 'c', 'd', 'e', 'f']
graph.addNodes(nodeValues);
graph.addEdge('f', 'a')
graph.addEdge('f', 'b')
graph.addEdge('d', 'c')
graph.addEdge('b', 'd')
graph.addEdge('a', 'd')
graph.addEdge('b', 'c')
graph.addEdge('f', 'd')
console.log(getBuildOrder(graph));
