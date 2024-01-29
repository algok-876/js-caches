// Import the necessary libraries and modules
import FIFOCache from '@/fifo';

// Import the testing framework and assertion library
import { describe, expect, it } from '@jest/globals';

// Test the LRU cache
describe('FIFO cache', () => {
    it("should return the correct value", () => {
        const cache = new FIFOCache<number, number>(10);
        for (let i = 0; i < 10; i++) {
            cache.put(i, i);
        }
        for (let i = 0; i < 10; i++) {
            expect(cache.get(i)).toBe(i);
        }
    })

    it("Delete the cache that entered first", () => {
        const cache = new FIFOCache<number, number>(3);
        cache.put(1, 9)
        cache.put(2, 8)
        cache.put(3, 7)
        cache.put(4, 6)
        expect(cache.has(1)).toBeFalsy()
        expect(cache.get(1)).toBeNull()
        expect(cache.get(2)).toBe(8)
    })

    it("Update existing cache", () => {
        const cache = new FIFOCache<number, number>(3);
        cache.put(1, 9)
        cache.put(2, 8)
        cache.put(3, 7)
        cache.put(1, 100)
        expect(cache.get(1)).toBe(100)
        cache.put(6, 77)
        expect(cache.get(1)).toBeNull()
    })

    it("The cache capacity cannot be less than 1", () => {
        expect(() => { new FIFOCache<number, number>(0) }).toThrow('capacity must be at least 1')
    })
})