// Singly Linked List implementation
//
export class Snode<T> {
    value: T;
    next: Snode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// no parameter needed because it'll just begin as an empty list so no value needed
export class SinglyLinkedList<T> {
    head: Snode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(value: T) {
        // if the head of the value is null, add new node
        // otherwise, add the value to the next node
        const newSnode = new Snode(value);

        if (!this.head) {
            this.head = newSnode;
        } else {
            // traverse the linked list, starting at head, and once we reach the end, link the new Snode
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newSnode;
        }
        this.size++;
    }

    remove(value: T): boolean {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value !== value) {
                current = current.next;
            } else if (current.next.value === value) {
                  // e.g. with [1 > 2 > 3], where current.next = 2, if we're removing 2, current.next becomes 3, which is current.next.next
                  current.next = current.next.next;
                  this.size--;
                  return true;
            }
        }
        return false;
    }

    print(): void {
        let current = this.head
        const elements: T[] = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(" -> "))
    }
}
