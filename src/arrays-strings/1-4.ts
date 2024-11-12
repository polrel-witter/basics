// Palindrome permutation
//
// strings with odd length must have exactly one odd character
// can't have more than one character that is odd
//
// madam
// racecar
//
function hasPalindromePermutation(str: string): boolean {
    // Create hash table
    const charCount = new Map<string, number>();

    // Count characters
    for (const char of str.toLowerCase().replace(/\s/g, '')) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Check for palindrome permutation
    let oddCount = 0;
    for (const count of charCount.values()) {
        if (count % 2 !== 0) {
            oddCount++;
        }
        if (oddCount > 1) {
            return false;
        }
    }

    return true;
}

// Test cases
console.log(hasPalindromePermutation("Tact Coa"));
console.log(hasPalindromePermutation("hello"));
console.log(hasPalindromePermutation("aab"));
