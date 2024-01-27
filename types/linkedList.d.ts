export declare class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
    /**
     * 构造函数，创建一个双向链表节点。
     *
     * @param value 节点值。
     * @param next 下一个节点，可选。
     * @param prev 上一个节点，可选。
     */
    constructor(value: T, next?: Node<T>, prev?: Node<T>);
}
export declare class LinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    /**
     * 构造函数，初始化链表为空
     */
    constructor();
    /**
     * 将新节点推入链表尾部
     *
     * @param newNode 新节点
     * @returns 返回新节点
     */
    push(newNode: Node<T>): Node<T>;
    /**
     * 在链表末尾添加一个节点。
     *
     * @param value 要添加到链表末尾的值。
     * @returns 返回新添加的节点。
     */
    append(value: T): Node<T>;
    /**
     * 将链表的头节点移除并返回。
     *
     * @returns 如果链表为空，则返回null；否则返回被移除的节点。
     */
    shift(): Node<T> | null;
    /**
     * 将给定节点移动到尾部
     *
     * @param node 要移动的节点
     */
    moveToTail(node: Node<T>): void;
}
