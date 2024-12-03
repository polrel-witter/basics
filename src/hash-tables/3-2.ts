// Longest substring
//
// find the longest substring without repeating characters
//
// e.g.
//
// "abcabcbb"
// 3
// "abc"
//
// generate all possible substrings - keeping a running total in `longestCount` - updating it as you go.
//
// use a map to store the longestCount for each substring. e.g.
// "abc" > 3
// "abc" > 3
// "b" > 1
// "b" > 1
//
// obviously there's a collision in our example so we can either account for this or overwrite the previous entry. in this problem, there's no requirement to retain all values, but we should for best practice.
//
function longestSubString(str: string): number {
    const chars = new Set<string>();
    const subs = new Map<number, string>();

    let stringLen = 0;
    let newString = "";

    // generate all substrings and store in a map
    for (let i = 0; i < str.length; i++) {
        const current = str[i];

        // add substring and its length to the map when it reaches a repeat char
        if (chars.has(current)) {
            // add new string and its length
            subs.set(stringLen, newString);
            // reset variables
            stringLen = 1;
            newString = current;
            // clear the tracking set and add current
            chars.clear();
            chars.add(current);
        } else {
              stringLen++;
              newString.concat(current);
              chars.add(current);
        }
    }
    return Math.max(...Array.from(subs.keys()));
}

// test cases
console.log(longestSubString("abcaacbwjeb"));
console.log(longestSubString("pwwkew"));
