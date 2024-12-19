// Substring with concatenation of all words
//
// https://leetcode.com/problems/substring-with-concatenation-of-all-words/?envType=problem-list-v2&envId=hash-table
//
// given string s and an array of strings, words, determine the indicies of where all permutations of the word takes place.
//
// Input: s = "barfoothefoobarman", words = ["foo","bar"]
// Output: [0,9]
//
// keep in mind, each string in a word is the exact same length.
//
// distilled:
// - use a frequency map to map words within the array to their counts.
// - we know what the length of each permutation has to be, by simply counting the total number of chars from the concatenated words.
// - not only this, the words cannot mix - e.g. "foo" and "bar" cannot be "fob" "oar" - so the configuration of the word permutations themselves are simplified
// - so the core part of the function just needs to implement a sliding window over the string where it looks at a chunk at the same length as the words concatenated, map its set of words to a separate frequency map and compare the counts.
// - if we find a match we add the index of its first char to our output array.
// - the window then jumps forward the length of a single word. e.g. for our example above, it would be 3 chars.
//
// function:
// + store fixed-length of word and length of words concatenated
// + create frequency map for words array
// + check the string for permutations
//    + note index of first letter and slide a window of words-length (m) across the string
//    + chunk the word by word length (k), check the temporary map for an existing key, if yes, increment the stored value, else add it.
//    + once the window is fully consumed, check the original map to the temp map to see if the key/values align
//    + if yes, write index to output array
//    + else jump word-length and note the next index, performing the same lookup function.
//    + continue until the string is fully consumed.
//
// complexity:
// the string scan and lookup will be O(n + m*k), or just O(m*k). Map generation would just be O(m).
//
function findPermutationIndicies(str: string, words: string[]): number[] {
    const wordCount = words.length;
    const wordLength = words[0].length;
    const freqMap = populateMap(words);
    const concatLength = wordCount * wordLength;  // total length needed for a valid match

    let index = 0;
    let result: number[] = [];

    // Continue while we have enough characters left to form a valid match
    while (index <= str.length - concatLength) {
        // Take a section of proper length for all words
        let sect = str.slice(index, index + concatLength);
        // Generate a map for this section
        const tempMap = populateMap(chunkString(sect, wordLength));
        // Check if section's frequency matches words' frequency
        if (mapsAreEqual(freqMap, tempMap)) {
            result.push(index);
        }
        index += wordLength;  // Move forward by one word length
    }
    return result;

    function populateMap(arr: string[]): Map<string, number> {
        const currentMap = new Map<string, number>();

        let i = 0;
        let count = 1;
        while (i < arr.length) {
          if (currentMap.has(arr[i])) {
              let currentCount = currentMap.get(arr[i])!;
              count = currentCount + count;
          }
          currentMap.set(arr[i], count);
          count = 1;
          i++;
        }
        return currentMap;
    }

    function mapsAreEqual(map1: Map<string, number>, map2: Map<string, number>): boolean {
        if (map1.size !== map2.size) return false;
        for (const [key, val] of map1) {
            if (map2.get(key) !== val) return false;
        }
        return true;
    }

    function chunkString(str: string, length: number): string[] {
        const chunks: string[] = [];
        for (let i = 0; i < str.length; i += length) {
            chunks.push(str.slice(i, i + length));
        }
        return chunks;
    }
}

// test cases
console.log(findPermutationIndicies("barfoothefoobarman", ["foo", "bar"]));
console.log(findPermutationIndicies("wordgoodgoodgoodbestwordword", ["word", "good", "best", "word"]));
console.log(findPermutationIndicies("barfoofoobarthefoobarman", ["foo", "bar", "the"]));
