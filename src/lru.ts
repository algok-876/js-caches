import { LinkedList } from "./linkedList";
import { Node } from "./linkedList";
import { CacheItem } from "./type";
export default class LRUCahche<K, T> {
    private capacity: number;
    private list: LinkedList<CacheItem<K, T>>;
    private cache: Map<K, Node<CacheItem<K, T>>> = new Map();
    private count: number

    /**
     * 缓存容器构造函数，接收一个整数参数表示缓存容量。
     *
     * @param capacity 缓存容量
     */
    constructor(capacity: number) {
        this.capacity = capacity;
        this.list = new LinkedList<CacheItem<K, T>>();
        this.count = 0;
    }

    /**
     * 获取缓存中指定键的值
     *
     * @param key 键
     * @returns 返回键对应的值，如果键不存在则返回null
     */
    public get(key: K): T | null {
        // 判断缓存中是否存在该键
        if (!this.has(key)) {
            // 如果不存在，则返回 null
            return null;
        }
        // 获取缓存中对应键的节点
        const node = this.cache.get(key) as Node<CacheItem<K, T>>;
        // 将节点移动到链表尾部
        this.list.moveToTail(node);
        // 返回节点的值
        return node.value.val;
    }

    /**
     * 判断缓存中是否存在指定键值
     *
     * @param key 键值
     * @returns 如果缓存中存在该键值，返回true；否则返回false
     */
    public has(key: K): boolean {
        return this.cache.has(key);
    }

    /**
     * 将键值对存入缓存中
     *
     * @param key 键
     * @param value 值
     * @returns 无返回值
     */
    public put(key: K, value: T): void {
        // 创建一个对象val，包含value和key
        const val = {
            val: value,
            key
        }
        // 如果缓存中已经存在该key
        if (this.cache.has(key)) {
            // 获取缓存中对应的节点
            const node = this.cache.get(key) as Node<CacheItem<K, T>>;
            // 更新节点的value为val
            node.value = val;
            // 将节点移动到链表的尾部
            this.list.moveToTail(node);
            return;
        }
        // 如果缓存已满
        if (this.count === this.capacity) {
            // 获取链表头部的节点
            const node = this.list.shift() as Node<CacheItem<K, T>>;
            // 获取要删除的key
            const deleteKey = node.value.key;
            // 从缓存中删除该key对应的值
            this.cache.delete(deleteKey);
            // 计数器减1
            this.count--;
        }
        // 在链表尾部添加新的节点val
        const node = this.list.append(val)
        // 将新节点加入缓存中，使用key作为键，node作为值
        this.cache.set(key, node);
        // 计数器加1
        this.count++
    }
}