// Successor
//
// Write an algo that finds the next node of a given node (i.e. in-order successor) in a binary search tree. You can assume each node has a link to its parent.
//
// e.g.
//
//                      7
//                /           \
//               2             9
//           /      \       /    \
//          1        5     8       13
//                 /   \         /    \
//                4     6       11     14
//               /             /  \
//              3             10  12
//
//   The successor of 2 is 3
//   The successor of 6 is 7
//   The successor of 9 is 10
//   The successor of 8 is 9
//   The successor of 14 is null
//
//   Approach:
//   Going to use the recursive approach because my binary tree implementation doesn't currently have parent pointers and in any case it's more elegant while maintaining the same runtime: O(h) where h is the height of the tree.
//
//   Flow:
//   - check if root key = x key, if so return the min number in the right subtree
//   - if root key > x key, replace the successor pointer with node.left and recursively call the same function on it.
//   - if root key < x key, replace the successor pointer with node.right and recusrively call the same function on it.
//   - return the successor pointer.
//
import { Tree, Node } from "../lib/binary-tree";
import { buildBinarySearchTree } from "./4-2";

function findSuccessorBST(tree: Tree<number>, target: number): string {
    let succ: number | null = null;

    function inOrderSuccessor(root: Node<number> | null): number | null {
        if (!root) return null;

        if (root.value === target) return minimumBST(root.right);

        if (root.value > target) {
            succ = root.value;
            return inOrderSuccessor(root.left);
        } else return inOrderSuccessor(root.right);
    }

    function minimumBST(node: Node<number> | null): number | null {
        if (!node) return succ;

        if (node !== null && node.left === null) {
            succ = node.value;
        }
        return minimumBST(node.left);
    }

    function printSucc(out: number | null): string {
        return `${target}'s successor is ${out}`;
    }
    return printSucc(inOrderSuccessor(tree.head));
}

// Test cases
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const tree = buildBinarySearchTree(array);
console.log(findSuccessorBST(tree, 2));
console.log(findSuccessorBST(tree, 4));
console.log(findSuccessorBST(tree, 6));
console.log(findSuccessorBST(tree, 8));
console.log(findSuccessorBST(tree, 10));
console.log(findSuccessorBST(tree, 14));
