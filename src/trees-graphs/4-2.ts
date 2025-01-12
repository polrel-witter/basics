// Minimal tree
//
// Given an ordered array of unique integer elements, write an algorithm to construct a binary search tree of minimal height.
//
// input: [1, 2, 3, 4, 5, 6]
// output:
//          3
//        /   \
//       1     5
//        \   / \
//         2 4   6
// Flow:
// + make sure the input array contains unique elements and is in ascending order (probably can do this as we build the tree)
// + then its just inserting into the tree - checking against the above criteria.
//    + the insertion pattern will go left if the new node value is less than and right if it's greater.
//
import { Tree, Node } from "../lib/binary-tree";

export function buildBinarySearchTree(arr: number[]): Tree<number> {
    const tree = new Tree<number>();

    function buildMinimalBST(start: number, end: number): Node<number> | null {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = buildMinimalBST(start, mid - 1);
        node.right = buildMinimalBST(mid + 1, end);

        return node;
    }

    tree.head = buildMinimalBST(0, arr.length - 1);
    return tree;
}

// Test case
const array = [1, 2, 3, 4, 5, 6];
console.log(buildBinarySearchTree(array));
