// Letter combinations of a phone number
//
// from: https://leetcode.com/problems/letter-combinations-of-a-phone-number/?envType=problem-list-v2&envId=hash-table
//
// given a string of numbers (between 2 - 9), and their mapping to
// letters on a phone key pad, return all possible letter combinations.
//
// input: "23"
// output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
//
// input: ""
// output: []
//
// remember that 1 has no letters associated.
//
// first, map each number to an array of its letters.
// parse the input, constructing an array of all letters.
// based on the length of the input, derrive all possible permutations,
// outputing an array of strings.
//
// ["abc", "def", "ghi", "jkl"]
// ["abc", "def", "ghi"]
// ["abc", "def"]
//
// when taking the permutations remember that they'll follow the same
// structure as the letter input: e.g. in the above example, only "abc"
// can occupy the first letter in all permutations.
//
// so for instance, the first permutation set would be: ["adg", "adh",
// "adi", "aeg", "aeh", "aei", "afg", "afh", "afi"]
//
// then we do the same for the second and third letter in the first
// string.
//
// the problem with this approach is that we'd have an exponetial
// runtime, however, there's no way around it - to generate all possible
// combinations, you inherenetly have to construct every combination.
//
// while the runtime to generate the array of strings is O(n), it's
// O(3^n) to build the combintations.
//
// + build a map of each number pointed at its string of letters
// + parse the input, constructing an array of strings the same length
// as the input string
// - with the first string as anchor - iterating over it as the outer
// loop - build a new array with all possible combintations, limiting
// each combination to the length of the input.
//
function letterCombinations(str: string): string[] {
    if (!str) return [];

    const dial = new Map<string, string>([
        ['2', 'abc'],
        ['3', 'def'],
        ['4', 'ghi'],
        ['5', 'jkl'],
        ['6', 'mno'],
        ['7', 'pqrs'],
        ['8', 'tuv'],
        ['9', 'wxyz']
    ]);

    const result: string[] = [];

    function backtrack(combination: string, nextDigits: string) {
        // If no more digits to check, add the combination to results
        if (nextDigits.length === 0) {
            result.push(combination);
            return;
        }

        // Get the letters that the current digit maps to
        const letters = dial.get(nextDigits[0]);

        // Try each letter for the current digit
        for (const letter of letters!) {
            // Add the letter to combination and recurse with remaining digits
            backtrack(combination + letter, nextDigits.slice(1));
        }
    }

    backtrack('', str);
    return result;
}


console.log(letterCombinations("4535"));
