export default class LRUCahche<K, T> {
    private capacity;
    private list;
    private cache;
    private count;
    /**
     * 缓存容器构造函数，接收一个整数参数表示缓存容量。
     *
     * @param capacity 缓存容量
     */
    constructor(capacity: number);
    /**
     * 获取缓存中指定键的值
     *
     * @param key 键
     * @returns 返回键对应的值，如果键不存在则返回null
     */
    get(key: K): T | null;
    /**
     * 判断缓存中是否存在指定键值
     *
     * @param key 键值
     * @returns 如果缓存中存在该键值，返回true；否则返回false
     */
    has(key: K): boolean;
    /**
     * 将键值对存入缓存中
     *
     * @param key 键
     * @param value 值
     * @returns 无返回值
     */
    put(key: K, value: T): void;
}
