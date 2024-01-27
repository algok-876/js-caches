export class Node<T> {
    public value: T;
    public next: Node<T> | null;
    public prev: Node<T> | null;
    /**
     * 构造函数，创建一个双向链表节点。
     *
     * @param value 节点值。
     * @param next 下一个节点，可选。
     * @param prev 上一个节点，可选。
     */
    constructor(value: T, next?: Node<T>, prev?: Node<T>) {
        this.value = value;
        this.next = next || null;
        this.prev = prev || null;
    }
}

export class LinkedList<T> {
    public head: Node<T> | null;
    public tail: Node<T> | null;
    /**
     * 构造函数，初始化链表为空
     */
    constructor() {
        this.head = null
        this.tail = null
    }

    /**
     * 将新节点推入链表尾部
     *
     * @param newNode 新节点
     * @returns 返回新节点
     */
    public push(newNode: Node<T>) {
        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = this.head;
        }
        return newNode;
    }

    /**
     * 在链表末尾添加一个节点。
     *
     * @param value 要添加到链表末尾的值。
     * @returns 返回新添加的节点。
     */
    public append(value: T) {
        const newNode = new Node(value);
        return this.push(newNode);
    }

    /**
     * 将链表的头节点移除并返回。
     *
     * @returns 如果链表为空，则返回null；否则返回被移除的节点。
     */
    public shift() {
        // 如果链表为空，则直接返回 null
        if (!this.head) return null
        // 保存当前头节点
        const node = this.head;
        // 保存当前头节点的下一个节点
        const next = node.next;
        // 将头节点指向下一个节点
        this.head = next;
        // 如果链表不存在节点
        if (this.head === null) {
            this.tail = this.head
        }
        // 返回被移除的节点
        return node;
    }

    /**
     * 将给定节点移动到尾部
     *
     * @param node 要移动的节点
     */
    public moveToTail(node: Node<T>) {
        // 如果节点已经是尾节点，则直接返回
        if (node === this.tail) return;
        // 如果节点是头节点
        if (node === this.head) {
            // 将头节点移到尾部
            const node = this.shift();
            // 如果移除的节点存在，则将其添加到尾部
            if (node) this.push(node);
            return;
        }
        // 获取节点的前一个节点和后一个节点
        const prev = node.prev;
        const next = node.next;
        // 如果存在前一个节点
        if (prev) {
            // 将前一个节点的后继指向后一个节点
            prev.next = next;
        }
        // 如果存在后一个节点
        if (next) {
            // 将后一个节点的前驱指向前一个节点
            next.prev = prev;
        }
        // 将节点添加到尾部并更新尾部指针
        this.tail = this.push(node)
    }
}