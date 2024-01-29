import { CacheItem } from "./type";
export default class FIFOCache<K, T> {
    private cache: Map<K, CacheItem<K, T>> = new Map();
    private queue: CacheItem<K, T>[] = [];
    constructor(private capacity: number) {
        if (capacity < 1) {
            throw new Error('capacity must be at least 1');
        }
    }

    /**
     * 获取缓存中的指定键对应的值，若不存在则返回 null
     *
     * @param key 缓存键
     * @returns 缓存值，若不存在则返回 null
     */
    public get(key: K): T | null {
        if (this.cache.has(key)) {
            const item = this.cache.get(key) as CacheItem<K, T>;
            return item.val;
        }
        return null;
    }

    /**
     * 将键值对存入缓存中
     *
     * @param key 键
     * @param val 值
     * @returns 无返回值
     */
    public put(key: K, val: T): void {
        if (this.cache.has(key)) {
            const item = this.cache.get(key) as CacheItem<K, T>;
            item.val = val;
            return;
        }
        if (this.cache.size >= this.capacity) {
            const item = this.queue.shift() as CacheItem<K, T>;
            this.cache.delete(item.key);
        }
        const newCacheItem = {
            key,
            val
        };
        this.cache.set(key, newCacheItem);
        this.queue.push(newCacheItem);
    }

    /**
     * 判断缓存中是否存在指定键
     *
     * @param key 键名
     * @returns 存在返回 true，不存在返回 false
     */
    public has(key: K): boolean {
        return this.cache.has(key);
    }
}