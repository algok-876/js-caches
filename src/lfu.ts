import { LinkedList } from "./linkedList";
export default class LFUCache<K, T> {
    private keyToVal: Map<K, T> = new Map();
    private keyToFreq: Map<K, number> = new Map();
    private freqToKeys: Map<number, LinkedList<K>> = new Map();
    private capacity: number;
    private minFreq: number = 0;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    public get(key: K): T | null {
        if (!this.keyToVal.has(key)) {
            return null;
        }
        this.updateFreq(key);
        const val = this.keyToVal.get(key) as T;
        return val
    }

    public has(key: K): boolean {
        return this.keyToVal.has(key)
    }

    public put(key: K, value: T): void {
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this.updateFreq(key);
            return
        }

        if (this.keyToVal.size >= this.capacity) {
            this.removeMinFreq();
        }
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        this.putListifAbsent(1).append(key);
        this.minFreq = 1
    }

    private putListifAbsent(freq: number) {
        if (!this.freqToKeys.has(freq)) {
            this.freqToKeys.set(freq, new LinkedList<K>());
        }
        return this.freqToKeys.get(freq) as LinkedList<K>;
    }

    private updateFreq(key: K): void {
        const oldFreq = this.keyToFreq.get(key) as number
        const newFreq = oldFreq + 1;
        this.keyToFreq.set(key, newFreq);
        const oldFreqList = this.freqToKeys.get(oldFreq) as LinkedList<K>;
        oldFreqList.remove(key);
        const newFreqList = this.putListifAbsent(newFreq);
        newFreqList.append(key);
        if (oldFreqList.isEmpty()) {
            this.freqToKeys.delete(oldFreq)
            if (this.minFreq === oldFreq) {
                this.minFreq = newFreq;
            }
        }
    }

    private removeMinFreq(): void {
        const list = this.freqToKeys.get(this.minFreq) as LinkedList<K>;
        const minKey = list.shift()?.value;
        if (minKey) {
            this.keyToVal.delete(minKey);
            this.keyToFreq.delete(minKey);
        }
        if (list.isEmpty()) {
            this.freqToKeys.delete(this.minFreq);
        }
    }
}