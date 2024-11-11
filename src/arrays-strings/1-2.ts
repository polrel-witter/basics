// check permutation
//
// sort the strings and compare them
//
// this has an O(n) runtime
//
function isPermutation(str1: string, str2: string): boolean {
    // One-liner version
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// test cases
console.log(isPermutation("the dog went over the moon", "the cat went over the moon"));
console.log(isPermutation("hi, how are you?", "hi, how are you?"));
