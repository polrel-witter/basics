// Sum lists
//
// you have two digits represented as a linked list, stored in reverse order such that the 1's digit is at the head of the list. write a function that sums the two numbers and returns the sum as a linked list
//
// first, reverse each list and store as number
// add the numbers
// convert the sum into a linked list, in reverse order and return
//
// this runtime would be O(ab + 1 + n) so O(ab).
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function sumLists(list1: SinglyLinkedList<number>, list2: SinglyLinkedList<number>):
    SinglyLinkedList<number> {

    let revList1 = reverse(reverse(list1));
    let revList2 = reverse(reverse(list2));

    let first: number = listToDigit(revList1);
    let second: number = listToDigit(revList2);

    let sum = first + second;
    const sumList = new SinglyLinkedList<number>();

    //  This implementation:
    //  1. Takes the sum number and repeatedly extracts digits from right to left
    //  2. Uses modulo 10 (%) to get the rightmost digit
    //  3. Uses integer division (/10) to remove the rightmost digit
    //  4. Adds each digit to the list in order
    //  5. Handles the special case of sum being 0
    //
    //  For example, if sum is 617:
    //  1. First iteration: 617 % 10 = 7 (add to list)
    //  2. Second iteration: 61 % 10 = 1 (add to list)
    //  3. Third iteration: 6 % 10 = 6 (add to list)
    //  4. Result is list [7->1->6]
    //
    //  this works because dividing by 10 always gives you the right most digit as the remainder
    //
    // Handle 0 case explicitly
    if (sum === 0) {
        sumList.add(0);
        return sumList;
    }

    // Extract digits and add to list
    while (sum > 0) {
        sumList.add(sum % 10);  // Get rightmost digit
        sum = Math.floor(sum / 10);  // Move to next digit
    }

    return sumList;
}

function reverse(list: SinglyLinkedList<number>): SinglyLinkedList<number> {
    let previous: Snode<number> | null = null;
    let current: Snode<number> | null = list.head;

    while (current !== null) {
        const next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }

    list.head = previous;
    return list;
}

// example:
//
//  - For list [7->1->6]
//  - First iteration: result = 0 + (7 * 1) = 7
//  - Second iteration: result = 7 + (1 * 10) = 17
//  - Third iteration: result = 17 + (6 * 100) = 617
//
function listToDigit(list: SinglyLinkedList<number>): number {
    let result = 0;
    let current = list.head;
    let position = 1;  // Start with 1's place

    while (current !== null) {
        result += current.value * position;
        position *= 10;  // Move to next decimal place
        current = current.next;
    }

    return result;
}

const list1 = new SinglyLinkedList<number>();
const list2 = new SinglyLinkedList<number>();
list1.add(7);
list1.add(1);
list1.add(6);
list2.add(5);
list2.add(9);
list2.add(2);
const result: SinglyLinkedList<number> = sumLists(list1, list2);
result.print();
