// URLify
//
// runtime is O(n)
//
function makeUrlSafe(str: string): string {
    const arr = str.split('');

    // snip whitespace off the end, if present
    //
    function snipEnd(arr: string[]): string[] {
       let count = 0
       const rev = arr.reverse();
       for (let i = 0; rev[i] === ' '; i++) {
           count++;
       }

       return rev.slice(count).reverse();
    }

    // replace spaces with '%20'
    //
    function replaceSpace(arr: string[]): string {
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] === ' ') {
               arr[i] = '%20';
           }
       }
       return arr.join('');
    }

    const snipped = snipEnd(arr);
    return replaceSpace(snipped);
}

// test cases
//
console.log(makeUrlSafe("how did it go?"));
console.log(makeUrlSafe("how  did it go?   "));
