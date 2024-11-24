// Loop detection
//
// given a looped linked list, return the node at the beinning of the loop
//
// e.g.
// A > B > C > D > E > C (C is the beginning)
//
// a loop happens in a linked list when a pointer at some node points to an earlier node in the list. in the case above E points to C which comes before it so a loop in occur.
//
// brute force method would be to keep track of all previuos nodes, comparing the `current` node to the each previous node that came before it, but the runtime would be O(n^2), making this impractical.
//
// since a looped linked list will never reach null, we can use this to detect whether we're in a loop. the next step is to determine when we know we're in a loop. we need to know at what point we enter the loop, at which point we produce the previous node, knowing that it's the node that starts the loop.
//
// if we have two pointers, the first one ahead of the second one, if the first one advances without matching the second one, we know we're not in a loop so we advance the first pointer. we keep iterating, and checking the first pointer against the second one until we either reach null, or find a match. the problem with this approach is we don't the exact distance between these two pointers so it's possible to miss the match.
//
// the second one could retrace the list starting at the beginning for each new node we encounter. this would work, but again the problem is this would be an expensive runtime.
//
// the better known solution is to implement Floyd's Tortise and Hare algo which means you implement two pointers, one that advances 2 steps and a second that moves 1 step. if the pointers meet there's a loop. to find the loop start, reset 1 pointer to the head, keep the other at the meeing point, then move both at the same speed (1 step); they'lle ventually meet at loop start.
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function detectLoop(list: SinglyLinkedList<number>): Snode<number> | null {
    if (!list.head) return null;

    // two pointers beginning at head
    let hare: Snode<number> | null = list.head;
    let turtle: Snode<number> | null = list.head;

    // do hare and turtle meet?
    while (hare !== null && turtle !== null) {
        if (hare.next === null || hare.next.next == null) return null;
        if (hare !== list.head && hare === turtle) {
            // determine loop start; reset hare, keep turtle where it is and iterate 1 step until they meet, returning the previous node when they do
            hare = list.head;
            let prev: Snode<number> | null = hare;
            while (hare !== turtle) {
                prev = hare!;
                hare = hare!.next;
            }
            return prev;
        } else {
            hare = hare.next.next;
            turtle = turtle.next!; // cannot be null because it trails hare, and if there's a loop there's no null case by definition
        }
    }
    return null;
}

// tests:
// - no loop
// - loop
function createListFromArray(arr: number[]): SinglyLinkedList<number> {
    const list = new SinglyLinkedList<number>();
    arr.forEach(num => list.append(num));
    return list;
}

function testIsNotLoop() {
    const list = createListFromArray([1, 2, 3, 4, 5]);

    const result = detectLoop(list);
    console.log("Test 1 - no loop:", result === null);
}

function testIsLoop() {
    const list = createListFromArray([1, 2, 3, 4, 5]);

    // make the tail loop back at the third node
    list.head!.next!.next!.next!.next!.next = list.head!.next!.next;

    const result = detectLoop(list);
    console.log(result)
    console.log("Test 2 - is loop:", result?.value === 3);
}

// run tests
testIsNotLoop();
testIsLoop();
