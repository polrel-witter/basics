// Return the kth to last element
//
// 1 > 2 > 3 > 4 > 5 > 6 > 7 > 8
//
// 2 pointers, one that counts all nodes in the list, and a second to follow kth steps behind so that when the end of the list is reached, the second pointer is on the node we want.
//
// will need to check to see if the list is shorter than the distance between pointer 1 and 2.
//
// pointer 1 starts iterating over each node immediately
// pointer 2 doesn't start iterating until pointer 1 is kth distance ahead.
// once pointer 1 reaches the last element we return the node value that 2 is on.
//
// runtime would be O(n) since we're cycling through n once.
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function kthFromLast(list: SinglyLinkedList<number>, k: number): number | string {
    if (!list.head) return "list is empty";

    let current: Snode<number> | null = list.head
    let follower: Snode<number> | null = null;
    let count = 0;

    while (current !== null) {
        if (count === k - 1) {
            follower = list.head;
        } else if (count > k - 1 && follower !== null) {
            follower = follower.next;
        }
        count++;
        current = current.next;
    }
    if (follower !== null) {
        return follower.value;
    } else return "the list is shorter than the distance between kth and last element";
}

// test cases
const list = new SinglyLinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);
list.add(7);
list.add(8);
console.log(kthFromLast(list, 3));
console.log(kthFromLast(list, 5));
console.log(kthFromLast(list, 10));
console.log(kthFromLast(list, 1));
