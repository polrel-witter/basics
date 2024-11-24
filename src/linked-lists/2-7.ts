// Intersecting reference nodes
//
//  given two linked lists, return the intersecting node by reference, if the lists intersect.
//  examples (letters indicate node reference, not value):
//
//  no intersection:
//  List1: A -> B -> C -> D -> E
//  List2: F -> G -> D -> E
//
//  intersection at D:
//  List1: A -> B -> C -> D -> E
//  List2:      G -> H -> D -> E
//
//  if a lists intersects they share the same tail. so to get the intersection node, you get the length of each list, move the first pointer by the difference along the longer list so that pointer1 and pointer2 start at the same point, then walk them together, comparing the nodes each time, until you either hit a match or reach null.
//
//  so in our intersection at D example above, the difference in length is 1 so we would advance pointer1 to where it'll start at B, and pointer2 would start at G.
//
// get the length difference
// advance pointer1 by the difference along the longer list
// cycle through each list, keeping pointer1 and pointer2 synced
// comparing each node to each other until you've found a match
// produce the matched node or null
//
// this runtime is O(a + b + k) where k is the length of the difference between the two lists  so O(a + b) since we have iterate over both lists at least once to find their lengths.
//
import { Snode, SinglyLinkedList } from "../lib/singly-linked-list";

function getIntersectingNode(list1: SinglyLinkedList<number>, list2: SinglyLinkedList<number>): Snode<number> | null {
    // get length of each list
    let length1: number = getLength(list1);
    let length2: number = getLength(list2);

    // determine difference in length
    const diff: number = Math.abs(length1 - length2);

    // determine which list is longer
    let currentLong: Snode<number> | null = null;
    let currentShort: Snode<number> | null = null;

    if (length1 > length2) {
        currentLong = list1.head;
        currentShort = list2.head;
    } else {
        currentLong = list2.head;
        currentShort = list1.head;
    }

    // advance pointer1 to begin at same node index as pointer2
    for (let i = 0; i < diff; i++) {
        currentLong = currentLong!.next;
    }

    // walk pointers together through both lists until we find an intersecting node or reach the end
    while (currentLong !== null && currentShort !== null) {
        if (currentLong === currentShort) {
            return currentLong;
        } else {
            currentLong = currentLong.next;
            currentShort = currentShort.next;
        }
    }
    return null;
}

function getLength(list: SinglyLinkedList<number>): number {
    let count: number = 0;
    let current: Snode<number> | null = list.head;

    while (current !== null) {
        count++;
        current = current.next;
    }
    return count;
}



// test cases
function createListFromArray(arr: number[]): SinglyLinkedList<number> {
    const list = new SinglyLinkedList<number>();
    arr.forEach(num => list.append(num));
    return list;
}

// Test 1: Lists intersect in middle
function testIntersectingLists() {
    const list1 = createListFromArray([1, 2, 3, 4, 5]);
    const list2 = createListFromArray([10, 11]);

    // Create intersection by manually setting list2's tail to point to list1's node
    // Make list2's last node point to list1's node with value 3
    list2.head!.next = list1.head!.next!.next; // Points to node containing 3

    const result = getIntersectingNode(list1, list2);
    console.log("Test 1 - Should find intersection:", result?.value === 3);
}

// Test 2: Lists have same values but don't intersect
function testNonIntersectingLists() {
    const list1 = createListFromArray([1, 2, 3, 4]);
    const list2 = createListFromArray([1, 2, 3, 4]);

    const result = getIntersectingNode(list1, list2);
    console.log("Test 2 - Should not find intersection:", result === null);
}

// Test 3: Lists intersect at end
function testIntersectingAtEnd() {
    const list1 = createListFromArray([1, 2, 3]);
    const list2 = createListFromArray([10]);

    // Make list2's head point to list1's last node
    list2.head = list1.head!.next!.next;

    const result = getIntersectingNode(list1, list2);
    console.log("Test 3 - Should find intersection at end:", result?.value === 3);
}

// Test 4: One empty list
function testEmptyList() {
    const list1 = createListFromArray([1, 2, 3]);
    const list2 = new SinglyLinkedList<number>();

    const result = getIntersectingNode(list1, list2);
    console.log("Test 4 - Empty list should return null:", result === null);
}

// Run all tests
testIntersectingLists();
testNonIntersectingLists();
testIntersectingAtEnd();
testEmptyList();
