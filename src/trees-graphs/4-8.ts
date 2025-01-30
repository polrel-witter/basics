// First common ancestor
//
// Find the first common ancestor of two nodes in a binary tree. Not necessarily a BST.
//
// e.g.
//
//                7
//             /      \
//            3        6
//          /   \    /   \
//         8     1  9    10
//                 / \
//                12  4
//
// In this exmaple, the first common anscestor for 9 and 4 would be 6.
// For 1 and 8, it's 3
// For 9 and 1, it's 7
//
// Approach:
// - First we need to hunt for the two nodes passed in
// - We implement post-order traversal so we can know when to pay attention to the anscestor; e.g. we'd hit 4 first which means we'd know to pay attention to its parent, which is 9. 9 is our second node so we'd pay attention to its parent, which is 6, the common ancestor.
// - Need to account for nodes existing on different levels of the tree.
// - Need to find the lowest/deepest common ancestor
//
// if our two nodes are 4 and 6. Following the method above, we'd log 4's parent as 9 and 6's parent as 7. There's no way of knowing the connection.
//
// To account for this, we implement path recording and compare the intersection points for our two given nodes. e.g. for 4, as we perculate upward, we store all it's parents: [9, 6, 7]
// Then for 6 we store 7.
// At the end we check the list to find the closest common ancestor.
//
// More examples:
// 8 = [3, 7]
// 1 = [3, 7]
//
// 4 = [9, 6, 7]
// 9 = [6, 7]
//
// At each perculation upward, we compare the list to see if we have a common one. If we do, we know  this is the closets ancestor.
//
// Flow:
// + Init two arrays for path recording
// + Init two boolean toggles to know when to start tracking each path
// + Once one of the nodes is found start adding its parents to the list
// - At each recursive iteration, compare the tails of the list to see if they match
// - If so, produce it as it's the closets common ancestor
//
// While this implementation would work, there's too many variables to track. It would grow too complicated.
//
// Instead, below is a single-pass recursive approach which is far more elegant.
//
import { Tree, Node } from "../lib/binary-tree";
import { buildBinarySearchTree } from "./4-2";

function findCommonAncestor(tree: Tree<number>, node1: number, node2: number): number | null {
    function search(node: Node<number> | null): number | null {
        if (!node) return null;

        // If current node is either target, we found one
        if (node.value === node1 || node.value === node2) {
            return node.value;
        }

        const leftResult = search(node.left);
        const rightResult = search(node.right);

        // If we found both nodes in different subtrees, this is the ancestor
        if (leftResult && rightResult) {
            return node.value;
        }

        // Return whichever result exists (or null if neither)
        return leftResult || rightResult;
    }

    return search(tree.head);
}

// Test cases
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const tree = buildBinarySearchTree(array);
console.log(findCommonAncestor(tree, 10, 14));
console.log(findCommonAncestor(tree, 1, 4));
console.log(findCommonAncestor(tree, 8, 13));
