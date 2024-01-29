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
function isNode(node: any): node is Node<any> {
    return node && node.constructor === Node;
}
export class LinkedList<T> {
    public head: Node<T> | null;
    public tail: Node<T> | null;
    /**
     * 构造函数，初始化链表为空
     */
    constructor() {
        this.head = null;
        this.tail = null;
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
        if (!this.head) return null;
        // 保存当前头节点
        const node = this.head;
        // 保存当前头节点的下一个节点
        const next = node.next;
        // 将头节点指向下一个节点
        this.head = next;
        // 如果链表不存在节点
        if (this.head === null) {
            this.tail = this.head;
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
        // 删除节点
        const delNode = this.remove(node);
        // 如果删除的节点存在
        if (delNode) {
            // 将删除的节点推入尾部，并更新尾部节点
            this.tail = this.push(delNode);
        }
    }

    public isEmpty() {
        return this.head === null;
    }

    public remove(target: T | Node<T>) {
        // 判断目标是否为节点
        const isFind = !isNode(target);
        // 当前节点
        let current: Node<T> | null = null;
        // 如果目标不是节点
        if (isFind) {
            // 当前节点指向头节点
            current = this.head;
            // 遍历链表，查找目标值
            while (current && current.value !== target) {
                current = current.next;
            }
            // 如果未找到目标值，直接返回
            if (current === null) return;
        } else {
            // 如果目标就是节点本身，则直接将当前节点指向目标节点
            current = target;
        }

        // 如果当前节点是头节点
        if (current === this.head) {
            // 将头节点指向当前节点的下一个节点
            this.head = current?.next;
            this.head && (this.head.prev = null);
            // 如果头节点为空，则将尾节点也设为空
            if (this.head === null) this.tail = this.head;
            // 返回被删除的节点
            return current;
        }
        // 如果当前节点是尾节点
        if (current === this.tail) {
            // 将尾节点指向当前节点的上一个节点
            this.tail = current.prev;
            // 如果尾节点的下一个节点存在，则将其设为null，表示尾节点不再有下一个节点
            this.tail && (this.tail.next = null);
            // 返回被删除的节点
            return current;
        }
        // 获取当前节点的上一个节点和下一个节点
        const prev = current?.prev;
        const next = current?.next;
        // 如果上一个节点存在，则将其next指向下一个节点
        if (prev) prev.next = next;
        // 如果下一个节点存在，则将其prev指向上一个节点
        if (next) next.prev = prev;
        // 将当前节点的next和prev设为null，表示当前节点不再有下一个和上一个节点
        current.next = null;
        current.prev = null;
        // 返回被删除的节点
        return current;
    }
}