// Roman numeral to number
//
// convert a roman numeral to a number
//
// e.g.
//
// "III"
// 3
//
// "LXV"
// 65
//
// "MMCDLXV"
// 1000 + 1000 + 400 + 50 + 10 + 5
//
// "MMDCLXV"
// 1000 + 1000 + 500 + 100 + 50 + 10 + 5
// 2665
//
// the funciton will need to parse the input into a series of keys and look up their value. the value produced will be added to the running total.
//
// - iterate over the input, extracting each new char until we reach a valid numeral, if not we crash with an error.
// - for each valid numeral, we look up its number value
// - and add that to the running total.
// - return the total
//
// while this runtime is O(n), with O(1) lookup time per char, there's a simpler method: creating a map of only the base-case numerals and creating two constants: current and next, which are then compared to determine if we're needing to decrement or merely add to the total. something like:
// total += current < next ? -current : current;
//
function romanNumeralToNumber(str: string): number {
    const nums: Map<string, number> = new Map([
        ['I', 1],
        ['IV', 4],
        ['V', 5],
        ['X', 10],
        ['XL', 40],
        ['L', 50],
        ['XC', 90],
        ['C', 100],
        ['CD', 400],
        ['D', 500],
        ['CM', 900],
        ['M', 1000]
    ]);

    let total: number = 0;
    for (let i = 0; i < str.length; i++) {
        if ((str[i] === 'C' || str[i] === 'X' || str[i] === 'I') && i + 1 < str.length) {
              // form 2-char combo and look it up
              const twoChar = str[i] + str[i + 1];
              if (nums.has(twoChar)) {
                total += nums.get(twoChar)!;
                i++;  // skip next char since we used it
                continue;
              }
        }

        // 1-char lookup
        const oneChar = str[i];
        if (!nums.has(oneChar)) {
            throw new Error(`Invalid numeral: ${str[i]}`);
        }
        total += nums.get(oneChar)!;
    }
    return total;
}

console.log(romanNumeralToNumber("MMDCC"));
console.log(romanNumeralToNumber("CD"));
console.log(romanNumeralToNumber("DCCLXVIII"));
console.log(romanNumeralToNumber("XIV"));
console.log(romanNumeralToNumber("III"));
