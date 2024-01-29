// Import the necessary libraries and modules
import LFUCache from '@/lfu';

// Import the testing framework and assertion library
import { describe, expect, it } from '@jest/globals';

describe('LFU cache', () => {
    it("should return the correct value", () => {
        const cache = new LFUCache<number, number>(10);
        for (let i = 0; i < 10; i++) {
            cache.put(i, i);
        }
        for (let i = 0; i < 10; i++) {
            expect(cache.get(i)).toBe(i);
        }
    })

    it("Correctly eliminate the least recently used elements", () => {
        const cache = new LFUCache<number, number>(10);
        for (let i = 0; i < 10; i++) {
            cache.put(i, i);
        }
        cache.get(0)
        cache.put(18, 9)
        expect(cache.has(1)).toBeFalsy()
        expect(cache.get(1)).toBeNull()
        cache.get(2)
        cache.put(20, 9)
        expect(cache.get(3)).toBeNull()
        expect(cache.has(3)).toBeFalsy()
    })

    it("Update existing cache", () => {
        const cache = new LFUCache<number, number>(3);
        cache.put(1, 9)
        cache.put(2, 8)
        cache.put(3, 7)
        cache.put(1, 100)
        expect(cache.get(1)).toBe(100)
        cache.put(6, 77)
        expect(cache.get(2)).toBeNull()
    })
})