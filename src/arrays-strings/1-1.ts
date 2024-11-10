// take 1 element and compare it to all other elements,
// if there's a match, stop running and note that it's not unique
// else, you have a string with all unique values
//
// sort the string
// binary search for each element
//
function sortAndFindUnique(str: string): boolean {
    // ACII only
    if (str.length > 128) return false;
    // sort the string
    const sortedArr = str.split('').sort();

    // binary search
    function isUnique(arr: string[]): boolean {
        for (let i = 0; i < arr.length - 1; i++) {
            // binary search for dupes
            let left = i + 1;
            let right = arr.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                if (arr[mid] === arr[i]) {
                    return false; // found duplicate
                } else if (arr[mid] < arr[i]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return true;
    }

      const result = isUnique(sortedArr);
      return result;
}

// Test cases
console.log(sortAndFindUnique("hel"));     // "ehlo"
console.log(sortAndFindUnique("typescript")); // "ceiprst"
console.log(sortAndFindUnique("aaa"));       // "a"
console.log(sortAndFindUnique(""));          // ""
console.log(sortAndFindUnique("82d8cde009a54b95969145d1d6947a24"));
console.log(sortAndFindUnique("well here we go"));
