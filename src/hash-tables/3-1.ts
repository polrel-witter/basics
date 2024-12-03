// two sum
//
// given an array of numbers and a target, write a function that produces the indices of two numbers that add up to the target. can you produce a function that's less than O(n^2) time complexity?
//
// e.g.
//
// array: [11,2,15,7]
// target: 9
// produces: [0,1]
// because 2 + 7 = 9
//
// since a typescript map is an optimized hash table we'll use it to solve this problem.
// we first iterate through each element, checking if it's greater than or equal to target. if so, we move to the next item. if it's less than target we subtract it from the target to get the difference, x, and search for x.
//
function twoSum(numbers: number[], target: number): number[] {
    // Map stores complement -> index
    const seen = new Map<number, number>();

    for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];

        // If we've seen the complement before, we found our pair
        if (seen.has(current)) {
            return [seen.get(current)!, i];
        }

        // Store the complement we need to find
        const complement = target - current;
        seen.set(complement, i);
    }

    // No solution found
    return [];
}

// Example usage:
const result = twoSum([11,2,15,7], 9);  // returns [1,3] since 2 + 7 = 9
console.log(result);
