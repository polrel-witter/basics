// Remove duplicates
//
// Remove duplicates from an unsorted linked list
//
// FOLLOW UP
//
// Without a temporary buffer.
//
// F > O > L > L > O > W > ' ' > U > P
//
// with the runner technique we could have 2 pointers searching for the dupes.
// first pointer iterates over each node, for each node a second pointer iterates over each node checking against the node in the firs pointer. if the second node finds a match, that's not the same node the first one found, it it removes it.
//
// runtime is O(n^2)
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function removeDupes(list: SinglyLinkedList<string>): SinglyLinkedList<string> {
    if (!list.head) return list;

    let current: Snode<string> | null = list.head

    while (current !== null) {
        let runner: Snode<string> | null = current
        while (runner.next !== null) {
            if (runner.next.value === current.value) {
                runner.next = runner.next.next;
                list.size--;
            } else {
                runner = runner.next;
            }
        }
        current = current.next;
    }
    return list;
}

// test cases
const list = new SinglyLinkedList<string>();
list.add("F");
list.add("O");
list.add("L");
list.add("L");
list.add("O");
list.add("W");
list.add(" ");
list.add("U");
list.add("P");
removeDupes(list);
list.print();
