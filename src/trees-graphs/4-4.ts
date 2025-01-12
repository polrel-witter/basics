// Balance check
//
// Implement a function that checks whether a binary tree is balanced. "Balanaced" meaning the heights of each subtree never differ by more than one.
//
// e.g. balanced:
//          3
//        /   \
//       1     5
//        \   / \
//         2 4   6
//
// unbalanced:
//
//          3
//            \
//             5
//            / \
//           4   6
//
// Analysis:
// What do we know?
// - The function will produce true or false depending on the balance state
// - We'll probably implement post-order traversal to check each subtree
// - Each recursive call should return height info
// - At each node, we can:
//     - Get heights of both subtrees
//     - Check their difference
//     - Fail fast if imbalanced
//     - Return our own height if balanced
//
// Possible solutions:
// Traverse down each subtree, at each new recursive call, produce the height state of each subtree and compare them. the comparison should never exceed more than 1. If it does, terminate early with `false`, else return `true`.
//
import { Tree, Node } from "../lib/binary-tree";
import { buildBinarySearchTree } from "./4-2";

function isBalanced(tree: Tree<number>): boolean {
  return getHeight(tree.head) !== -1;
}

// Returns height of tree if balanced, -1 if unbalanced
function getHeight(node: Node<number> | null): number {
  if (!node) return 0;

  const leftHeight = getHeight(node.left);
  if (leftHeight === -1) return -1;

  const rightHeight = getHeight(node.right);
  if (rightHeight === -1) return -1;

  if (Math.abs(leftHeight - rightHeight) > 1) return -1;

  return Math.max(leftHeight, rightHeight) + 1;
}

// Test cases
const array = [1, 2, 3, 4, 5, 6];
const tree = buildBinarySearchTree(array);
console.log(isBalanced(tree));

// Walkthrough:
//
//          3
//            \
//             5
//            / \
//           4   6
//
// 1. At node 4: left = 0, right = 0 -> 1
// 2: At node 6: left = 0, right = 0 -> 1
// 3: At node 5: left = 1, right = 1 -> 2
// 4: At node 3: left = 0, right = 2 -> -1 (because 2 > 1)
// isBalanced sees -1 so returns false

