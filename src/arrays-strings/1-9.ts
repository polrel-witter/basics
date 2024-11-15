// String rotation
//
// Given two strings, compare them to see if s2 is a rotation of s1.
//
// Example
//
// s1: waterbottle
// s2: erbottlewat
//
// So the function will need to check whether the string has all the same chars, and whether they're in the same order, but simply rotated.
//
// Another example would be:
//
// s1: open house
// s2: open house
//
// Brute force:
//
// Check the length of both strings, if different lengths produce false
// could we just keep moving the first char of s2 to the end and checking against s1 each time, then if there's a match producing true, else false?
// Don't worry about the spaces, they'll align if its a match.
//
// The runtime is O(n) as it just has to iterate over one of the strings
//
function isSubstring(str1: string, str2: string): boolean {
    const len1 = str1.length
    const len2 = str2.length

    if (len1 === 0 || len1 !== len2) {
       return false;
    }

    // rotate str2, checking against str1 each time until we're finished rotating in full
    for (let i = 0; i < len2; i++) {
        str2 = str2.slice(1, len2).concat(str2.slice(0, 1));
        if (str2 === str1) {
           return true;
        }
    }
    return false;
}

// test cases
console.log(isSubstring("open house", "pen houseo"));
console.log(isSubstring("open houee", "pen houseo"));
console.log(isSubstring("open hour", "pen houseo"));
