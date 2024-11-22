// Palindrome
//
// check if a linked list is a palindrome
//
// we can know whether it's palindrome if it has basically 2 of each letter, and no more than 1 odd letter. exmaples:
//
// noon
// rotator
// hello
// olleh
//
// can check this by keeping track of the count of each letter instance. if we have more than one odd letter out then we know it's not a palidrome, otherwise it is.
//
// one way to do this is by mapping each letter to its count and checking each count at the end. but we don't even really need to know what the letters are, we can simply retain a count and increment for each novel letter, then decrementing ones we've encountered before. if the final count is 0 or 1 we know we have a palidrome, anything over this we know we don't. the problem with this approach is there's no efficent way to keep track of letters already consumed.
//
// a better method would be to make a copy of the list, flip it, then iterate over both lists checking each letter to ensure they match. if they do we have a palidrome.
//
// this runtime would be O(n + n^2 + k) where k means the algo would stop the moment a letter comparison doesn't match. so this distills to O(n^2).
//
// make a copy of the list, flipping it along the way
// iterate over both lists, checking each letter
// if at any point they don't match, exit with false
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function isPalindrome(list: SinglyLinkedList<string>): boolean {
    const flipped = copyList(list);
    reverse(flipped);

    let lCurrent: Snode<string> | null = list.head;
    let fCurrent: Snode<string> | null = flipped.head;

    // check each letter that align at the same index
    while (lCurrent !== null && fCurrent !== null) {
        if (lCurrent.value !== fCurrent.value) {
            return false;
        } else {
            lCurrent = lCurrent.next;
            fCurrent = fCurrent.next;
        }
    }
    return true;
}

function reverse(list: SinglyLinkedList<string>): SinglyLinkedList<string> {
    let previous: Snode<string> | null = null;
    let current: Snode<string> | null = list.head;

    while (current !== null) {
        const next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }

    list.head = previous;
    return list;
}

function copyList(list: SinglyLinkedList<string>): SinglyLinkedList<string> {
    const copy = new SinglyLinkedList<string>();
    let current = list.head;
    while (current !== null) {
        copy.add(current.value);
        current = current.next;
    }
    return copy;
}

// test cases
const list = new SinglyLinkedList<string>();
list.add("r");
list.add("o");
list.add("t");
list.add("a");
list.add("t");
list.add("o");
list.add("r");
console.log(isPalindrome(list));
