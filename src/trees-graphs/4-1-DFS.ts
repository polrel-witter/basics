// Find a route between two nodes
//
// Implement DFS to find the route between two nodes.
//
// 1 -> 3, 5
// 2 -> 1, 8
// 3 -> 7, 8, 4
//
// Input: 1, 4
// Output: 1 -> 3 -> 4
// Because 1 points to 3 which points to 4
//
// So with DFS the function will need to visit each node, exactly once, which means we've flattened our map keys into a list and
