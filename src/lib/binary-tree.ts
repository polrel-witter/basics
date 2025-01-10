// Binary tree implementation in Typescript
//
class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }
}

export { Tree, Node }
