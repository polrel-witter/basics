// Delete middle node
//
// e.g
// 1 > 2 > 3 > 4 > 5 > 6
//
// becomes
// 1 > 2 > 4 > 5 > 6
//
// it doesn't necessarily need to be the exact middle node, meaning something like n / 2 and round up if it's a decimal.
//
// get the length of the list
// length / 2, round up if decimal
// traverse the list up to this point and remove the node
//
// runtime would be O(n + k) where k is the length of half the nodes in the list.
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function deleteMiddleNode(list: SinglyLinkedList<number>): SinglyLinkedList<number> {
    if (!list.head) return list;

    let length = 0;
    let current: Snode<number> | null = list.head;

    while (current !== null) {
        length++;
        current = current.next;
    }

    const halfLength = Math.ceil(length / 2) - 1;

    // reset current
    current = list.head;
    let prev: Snode<number> | null = null;

    for (let i = 0; i < length; i++) {
        if (i === halfLength) {
            // skip the middle node by connecting previous to the next node
            if (prev) {
                prev.next = current!.next;
            } else {
                // remove the head, if that's what we're doing
                list.head = current!.next;
            }
            list.size--;
            break;
        }
        prev = current
        current = current!.next;
    }
    return list;
}
const list = new SinglyLinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
deleteMiddleNode(list);
list.print();
