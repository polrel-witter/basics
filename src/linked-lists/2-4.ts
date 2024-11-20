// Partition
//
// rearrange a list such that all nodes less than x come before all
// nodes greater than or equal to x.
//
// e.g.
//
// 2 > 4 > 5 > 10 > 8 > 3 > 5 > 1
//
// where partition = 5
//
// 2 > 1 > 4 > 3 > 10 > 5 > 5 > 8
//
// clearly does not need to be in perfect ascending order.
//
// pass a pointer through the list, checking whether each element is
// greater than or equal to x, and if so removing the element, placing
// it in a new list which will be appended to the original list at the
// end.
//
// this runtime would be O(n + k) where k is the lenght of the original
// list once elements >= x are removed. since k is less than or equal to n, the runtime is just O(n).
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function partitionX(list: SinglyLinkedList<number>, x: number):
    SinglyLinkedList<number> {

    const append = new SinglyLinkedList<number>();

    let prev: Snode<number> | null = null;
    let current: Snode<number> | null = list.head;

    // separate into two lists, divided by those >= x
    while (current !== null) {
        if (current.value >= x) {
            // add to append list and remove from original
            append.add(current.value);
            if (prev === null) {
                list.head = current.next;
            } else {
                prev.next = current.next;
            }
            current = current.next;
        } else {
            prev = current;
            current = current.next;
        }
    }

    // reset current, this time to the head of the append list
    current = append.head;

    // link the two lists back together
    while (current !== null) {
        list.add(current.value);
        current = current.next;
    }
    return list;
}

// test cases
const list = new SinglyLinkedList<number>();
list.add(3);
list.add(8);
list.add(7);
list.add(3);
list.add(20);
list.add(8);
list.add(9);
list.add(0);
partitionX(list, 8);
list.print();
