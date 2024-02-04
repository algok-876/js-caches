// Import the necessary libraries and modules
import LRUCahche from '@/lru';

// Import the testing framework and assertion library
import { describe, expect, it } from '@jest/globals';

// Test the LRU cache
describe('LRU cache', () => {
    it("should return the correct value", () => {
        const cache = new LRUCahche<number, number>(10);
        for (let i = 0; i < 10; i++) {
            cache.put(i, i);
        }
        for (let i = 0; i < 10; i++) {
            expect(cache.get(i)).toBe(i);
        }
    });

    it("Correctly eliminate the least recently used elements", () => {
        const cache = new LRUCahche<number, number>(3);
        cache.put(1, 9);
        cache.put(2, 8);
        cache.put(3, 7);
        cache.put(4, 6);
        expect(cache.has(1)).toBeFalsy();
        expect(cache.get(1)).toBeNull();
        cache.get(2);
        cache.put(5, 10);
        expect(cache.has(3)).toBeFalsy();
        expect(cache.get(3)).toBeNull();
    });

    it("Update existing cache", () => {
        const cache = new LRUCahche<number, number>(3);
        cache.put(1, 9);
        cache.put(2, 8);
        cache.put(3, 7);
        cache.put(1, 100);
        expect(cache.get(1)).toBe(100);
        cache.put(6, 77);
        expect(cache.get(2)).toBeNull();
    });
});