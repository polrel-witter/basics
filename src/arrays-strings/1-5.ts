// One away
//
// base case
//
// a function that accepts 2 strings, and that tells whether we're 1 or zero edits away from having two identical strings
// we can either insert a character, which means one of the strings is 1 less char than the other
//    - just need to know where to insert
// we can remove a character; meaning one is 1 string longer than the other
//    - need to know which character to remove
// we can replace a character; which means the strings are the same length, but 1 character is off
//    - need to know which characte to replace
//
// just need to determine probablity to of being one away based on the three rule. that we can do one of the following to make them both identical:
// - insert: can we add 1 char?
// - remove: can we remove 1 char?
// - replace: can we swap 1 char?
// don't need to actually know where or what to insert, replace, or remove; just that we can or cannot do it.
//
// example input
// pales, pale
// done, dne
// happy, hippys
// fun, continue
//
// English Soltuion
//
// a function that compares the size of both strings
// - if lenghts are equal, check if the strings are identical, if so true, else check if all chars match except 1
// - if not equal, make sure all but 1 char match
//
function oneAway(str1: string, str2: string): boolean {
    if (Math.abs(str1.length - str2.length) > 1) return false;

    const charCount = new Map<string, number>();

    // add values from first string
    for (const char of str1) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // sub values from second string
    for (const char of str2) {
        charCount.set(char, (charCount.get(char) || 0) - 1);
    }

    let difference = 0
    for (const count of charCount.values()) {
        difference =+ Math.abs(count);
    }

    // if greater than 2 then insert, replace or remove by 1 char won't work
    return difference <= 2;
}

// test cases
console.log(oneAway("welp", "well"));
console.log(oneAway("hello", "heol"));
console.log(oneAway("pale", "pales"));
console.log(oneAway("fun", "continue"));
