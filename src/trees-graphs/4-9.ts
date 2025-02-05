// BST Sequences
//
// Suppose a binary search tree was created by taking the elements from an array from left to right. Given a BST with distinct elements, produce all possible sequences.
//
// e.g.
//
//        2
//       / \
//      1   3
//
// Output: [2, 1, 3], [2, 3, 1]
//
// Approach:
// - Root must come first
// - Left/right children can be inserted in any order relative to each other
// - Recursively build each subtree, weaving each new one into the larger structure
//
// Flow:
// - Init an array of an array
// - Recurse over the tree.head, building two list of elements: left subtree and right subtree
// - Weave these two lists together following the BST criteria
//
  function getSequences(node: Node<number>): number[][] {
      if (!node) return [[]];
      if (!node.left && !node.right) return [[node.value]];

      const leftSeqs = getSequences(node.left);   // [[1]]
      const rightSeqs = getSequences(node.right); // [[3]]

      const result: number[][] = [];

      // For each combination of left and right sequences
      for (const leftSeq of leftSeqs) {
          for (const rightSeq of rightSeqs) {
              // Get all possible weaves starting with current node
              const weaved = weaveSequences(leftSeq, rightSeq); // [1, 3]
              // Add current node at start of each weaved sequence
              weaved.forEach(sequence => {
                  result.push([node.value, ...sequence]);
              });
          }
      }

      return result;
  }

  function weaveSequences(left: number[], right: number[]): number[][] {
      // Return all possible ways to weave left and right arrays
      // maintaining their relative internal order

  }
