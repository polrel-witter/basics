// Doubly linked list
//
class Dnode<T> {
    value: T;
    next: Dnode<T> | null;
    previous: Dnode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList<T> {
    head: Dnode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertFront(value: T) {
        const newDnode = new Dnode(value);

        if (!this.head) {
            this.head = newDnode;
        }
        // link current head's previous to the new node,
        // then set the head to the new node,
        // and link the new head to the current head
        else {
          const current = this.head
          this.head.previous = newDnode;
          this.head = newDnode;
          this.head.next = current;
        }
        this.size++
    }

    // insert at specific position
    // remove from beginning
    // remove from specific position
    // search
    // reverse
    // clear; remove all nodes from list
    // print forward and backward

    print(): void {
        let current = this.head
        const elements: T[] = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(" <-> "))
    }
}

// Test cases
const list = new DoublyLinkedList<number>();
list.insertFront(1);
list.insertFront(2);
list.insertFront(3);
list.print();
