// Validate BST
//
// Check whether a binary tree is a binary search tree or not.
//
// Core property of a BST is that its ordered such that all left nodes are less than or equal to the current node, and less than all right nodes.
//
// e.g.
//
//        8
//      /   \
//     4    10
//    / \     \
//   2   6     20
//
//  Approach:
//  Must ensure: all left <= n < all right
//  The core property a valid BST will have is that the sequence of numbers will be in ascending order:
//  e.g. [2, 4, 6, 8, 10, 20]
//  We can implement in-order traversal which inherently validates this structure by simply storing the previous number and ensuring it's <= the next number.
//
//  Flow:
//  - Following the in-order traversal method, the nodes will be visited in the following order:
//      - left
//      - current
//      - right
//  - For each node visited, we "carry it up" to compare, ensuring it's <= next node
//
// Runtime:
// Would be O(n) with the potential for it to exit early if it catches an invalid ordering.
//
import { Tree, Node } from "../lib/binary-tree";
import { buildBinarySearchTree } from "./4-2";

function validateBST(tree: Tree<number>): boolean {
    let previous: Node<number> | null = null;

    function inOrderTraversal(node: Node<number> | null): boolean {
        if (!node) return true;

        // Validate left branch
        const left = inOrderTraversal(node.left);
        if (!left) return false;

        // Branch value comparison
        if (previous && previous.value > node.value) return false;

        // Assign previous
        previous = node;

        // Validate right branch
        const right = inOrderTraversal(node.right);
        if (!right) return false;

        return true;
    }
    return inOrderTraversal(tree.head);
}

// Test case
const array = [2, 4, 6, 8, 10, 20];
const tree = buildBinarySearchTree(array);
console.log(validateBST(tree));

// Walkthrough:
//
//        8
//      /   \
//     4    10
//    / \     \
//   2   6     20
//
//  1. At node 2: previous = null -> false;
//  2. At node 4: previous = 2 -> true;
//  3. At node 6: previous = 4 -> true;
//  4. At node 8: previous = 6 -> true;
//  5. At node 10: previous = 8 -> true;
//  6. At node 20: previous = 10 -> true;
//  last node is null so return true for inOrderTraversal
