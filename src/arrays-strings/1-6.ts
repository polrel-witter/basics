// String compression
//
// if there are repeating characters, compress them, otherwise return the string
//
// example
// aaabbbeccssdd > a3b3e1c2s2d2
//
// count the repeated chars
// append each char with its count
// compare the result with the input and if shorter produce it, otherwise produce the string
//
// runtime is O(n^2)
//
function compressString(str: string): string {
    let count = 0;
    let compressed = "";

    for (let i = 0; i < str.length; i++) {
        count++;
        if (i + 1 >= str.length || str[i] !== str[i + 1]) {
            compressed += str[i] + count;
            count = 0;
        }
    }

    // produce whichever is shorter
    if (compressed.length >= str.length) {
       return str;
    }
    return compressed;
}

// test cases
console.log(compressString("aabbasssssss"));
console.log(compressString("abc"));
