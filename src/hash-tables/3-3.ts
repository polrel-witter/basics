// Roman numeral conversions
//
// given a number, convert each of its decimal places to a roman numeral
//
// e.g.
// in: 458
// out: "CDLVIII"
//
//Symbol	Value
// I	1
// V	5
// X	10
// L	50
// C	100
// D	500
// M	1000
//
// so if we're converting by decimal place, in order to know the
// numeral we probably just need to take into account the current digit
// and it's place in the number. e.g. the "4" represents 400, "5" 50,
// and "8" 8.
//
// so our algo first needs to convert the number to a string and count
// its length. it'll have a second string to store the output.
//
// it should then convert each digit it finds to its actual number; e.g.
// "4" in the example is 400, then convert that to its roman numeral and
// prepend to our output string.
//
// but how does it find the roman numeral?
// - if it starts with 4 or 9, subtract one
// - else, count up to it
//
// but first start with determining whether it's in one of the 7 symbol
// categories. e.g.
// - four digits will be M.
// - three digits will be a combination of D and C
// - two, L and X
// - one, I and V
//
// so given the length of our example, 3, we know its numeral value is
// going to be a combination of D and C. we first check if it's 5, which
// would just yield D. then check if it's 4 which would allow us to
// subtract from D ("CD"). else, we'll count up to it. so it could be
// one of the following:
// 300 = CCC
// 200 = CC
// 100 = C
//
// to get the numberal, we check whether the current digit is greater
// than or equal to either 5, 50, or 500. comparision is determined by number of
// digits. e.g.
// (div 400 500) = .8
//
// wait a minute, if we divide the input by it 'checkpoint' (either 5,
// 50, or 500) we'll get outputs of decimal numbers that range from 0 -
// 2, with a difference of .2 between each possible output. an output of
// .8 would mean the decimal starts with either 4 or 9, and if it begins
// with 1 we're greater than the checkpoint, and 0 means we're lower.
//
// so given the checkpoint and the remainder, we can determine the exact
// numeral 400 would represent.
//
// all that's left is to determine how we get the numeral. we can either
// have a map of a map that stores the decimals between 0 - 2 that
// correspond to the appropirate numerals or toss out this division and
// generate the numerals on the fly, but this would be computationally
// expensive and i don't see an efficent way to do this.
//
// so for 5, our map would be:
// 1.8 = 9 = IX
// 1.6 = 8 = VIII
// 1.4 = 7 = VII
// 1.2 = 6 = VI
// 1   = 5 = V
// .8  = 4 = IV
// .6  = 3 = III
// .4  = 2 = II
// .2  = 1 = I
//
// edge cases: the input cannot exceed 3999 because our symbols do not
// represent anything higher.
//
// algorithm:
// + check if digit is greater than 3999, if yes, produce error; cannot
// represent
// + generate four maps that stores link between remainders and
// numerals
// + convert input to string and count length
// - if length is four, pull first digit and determin if M, MM, or MMM
// - pull next digit and divide it by 5 to get its remainder.
// - given the current length, pull from either the single, double, or
// triple digit map to determine its numeral.
// - append the numeral to the output
// - continue until the input is fully converted
//
const quadDigitNumeral: Map<number, string> = new Map([
    [1, "M"],
    [2, "MM"],
    [3, "MMM"]
]);

const tripleDigitNumeral: Map<number, string> = new Map([
    [1.8, "CM"],
    [1.6, "DCCC"],
    [1.4, "DCC"],
    [1.2, "DC"],
    [1.0, "D"],
    [0.8, "CD"],
    [0.6, "CCC"],
    [0.4, "CC"],
    [0.2, "C"]
]);

const doubleDigitNumeral: Map<number, string> = new Map([
    [1.8, "XC"],
    [1.6, "LXXX"],
    [1.4, "LXX"],
    [1.2, "LX"],
    [1.0, "L"],
    [0.8, "XL"],
    [0.6, "XXX"],
    [0.4, "XX"],
    [0.2, "X"]
]);

const singleDigitNumeral: Map<number, string> = new Map([
    [1.8, "IX"],
    [1.6, "VIII"],
    [1.4, "VII"],
    [1.2, "VI"],
    [1.0, "V"],
    [0.8, "IV"],
    [0.6, "III"],
    [0.4, "II"],
    [0.2, "I"]
]);

function getNumeral(digitLength: number, key: number): string {
    switch (digitLength) {
        case 4: return quadDigitNumeral.get(key) ?? "";
        case 3: return tripleDigitNumeral.get(key) ?? "";
        case 2: return doubleDigitNumeral.get(key) ?? "";
        case 1: return singleDigitNumeral.get(key) ?? "";
        default:
          return "";
    }
}

function convertToRomanNumeral(num: number): string {
    if (num > 3999) return "This function can only represent numbers under 4,000";

    const str = num.toString()
    let currentLength = str.length

    let key: number = 0;
    let integer: number = 0;
    let romanNumeral: string = "";

    for (let i = 0; i < str.length; i++) {
        // get current integer, by appending zeros, if possible
        integer = parseInt(str[i] + "0".repeat((currentLength - 1)));
        // derrive key by dividing by checkpoint
        key = integer / (currentLength > 3 ? 1000 : currentLength > 2 ? 500 : currentLength > 1 ? 50 : 5)
        // get the roman numeral and append it to the output
        romanNumeral = romanNumeral.concat(getNumeral(currentLength, key));
        currentLength = currentLength - 1;
    }
    return romanNumeral;
}

console.log(convertToRomanNumeral(65));
console.log(convertToRomanNumeral(10));












