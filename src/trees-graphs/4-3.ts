// List of depths
//
// Write an algorithm that creates a linked list of all the nodes at each depth. i.e. if you have a tree with depth D, you'll have D linked lists
//
// Input:
//          3      // Depth 0
//        /   \
//       1     5   // Depth 1
//        \   / \
//         2 4   6 // Depth 2
// Output:
// [3]
// [1, 5]
// [2, 4, 6]
//
// Algo flow:
// + Init an array of linked lists to store for our output
// + The challenge here is knowing the depth state. What's the pattern? We know the tree.head is the first depths.
// + We also know the leftside of the tree goes first so the algo should implement pre-order traversal so that the current node - starting with the root - then the leftside then the right side is added organically to the linked lists, in the order we need them to be.
// + What would our state structure be to track the current depth - therefore which list to add to - for each iteration? The solution is to add a depth parameter to the recursive function which increments at each new function call. This works becuase it's easy to keep track of how many times a recursive function has been called.
//
// Time complexity:
// listOfDepths is dependent on the createLists function which recursively traverses the input tree from root to ending leaves exactly once so the runtime is O(n).
//
import { Tree, Node } from "../lib/binary-tree";
import { buildBinarySearchTree } from "./4-2";
import { SinglyLinkedList } from "../lib/singly-linked-list";

function listOfDepths(tree: Tree<number>): SinglyLinkedList<number>[] {
    const lists: SinglyLinkedList<number>[] = [];

    function createLists(node: Node<number> | null, depth: number): void {
        if (!node) return;

        // If this depth doesn't have a list yet, create one
        if (lists.length === depth) {
            lists[depth] = new SinglyLinkedList<number>();
        }

        // Add current node to its depth's list
        lists[depth].append(node.value);

        // Left and right children are depth + 1
        createLists(node.left, depth + 1);
        createLists(node.right, depth + 1);
    }
    createLists(tree.head, 0)
    return lists;
}

function printLists(lists: SinglyLinkedList<number>[]): void {
    for (const l of lists) {
        l.print();
    }
}

// Test cases
const array = [1, 2, 3, 4, 5, 6];
const tree = buildBinarySearchTree(array);
const lists = listOfDepths(tree);
printLists(lists);
