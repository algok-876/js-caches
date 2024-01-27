// Import the necessary libraries and modules
import { Node, LinkedList } from '@/linkedList';

// Import the testing framework and assertion library
import { describe, expect, it } from '@jest/globals';

// Test the push method of the LinkedList class
describe('LinkedList', () => {
    describe('push', () => {
        it('should add a new node to the end of the list', () => {
            // Create a new LinkedList instance
            const linkedList = new LinkedList<number>();

            // Create a new node
            const newNode = new Node(1);

            // Call the push method with the new node
            linkedList.push(newNode);

            // Assert that the new node is at the end of the list
            expect(linkedList.tail).toBe(newNode);
            expect(newNode.next).toBeNull();
            expect(newNode.prev).toBeNull();
        });

        it('should handle multiple nodes correctly', () => {
            // Create a new LinkedList instance
            const linkedList = new LinkedList<number>();

            // Create and add multiple nodes
            const node1 = new Node(1);
            const node2 = new Node(2);
            const node3 = new Node(3);

            linkedList.push(node1);
            linkedList.push(node2);
            linkedList.push(node3);

            // Assert that the nodes are linked correctly
            expect(linkedList.head).toBe(node1);
            expect(linkedList.tail).toBe(node3);
            expect(node1.next).toBe(node2);
            expect(node2.next).toBe(node3);
            expect(node2.prev).toBe(node1);
            expect(node3.prev).toBe(node2);
        });

        it('should handle empty list', () => {
            // Create a new LinkedList instance
            const linkedList = new LinkedList<number>();

            // Create a new node
            const newNode = new Node(1);

            // Call the push method with the new node
            linkedList.push(newNode);

            // Assert that the new node is at the head of the list
            expect(linkedList.head).toBe(newNode);
            expect(linkedList.tail).toBe(newNode);
            expect(newNode.next).toBeNull();
            expect(newNode.prev).toBeNull();
        });
    })

    describe('append', () => {
        it('should add a new node at the end of the list', () => {
            // Arrange
            const linkedList = new LinkedList<number>();
            const value = 5;
            linkedList.append(value);

            // Act
            const lastNode = linkedList.tail;

            // Assert
            expect(lastNode).toBeDefined();
            expect(lastNode?.value).toBe(value);
        });

        it('should update the tail pointer to the new node', () => {
            // Arrange
            const linkedList = new LinkedList<number>();
            const value1 = 10;
            const value2 = 20;
            linkedList.append(value1);
            linkedList.append(value2);

            // Act
            const oldTail = linkedList.tail;
            linkedList.append(30);

            // Assert
            expect(linkedList.tail).not.toBe(oldTail);
            expect(linkedList.tail?.value).toBe(30);
        });

        it('should handle multiple appends', () => {
            // Arrange
            const linkedList = new LinkedList<number>();
            const values = [1, 2, 3, 4, 5];
            values.forEach(value => linkedList.append(value));

            // Act
            const actualValues: (number | null)[] = [];
            let currentNode = linkedList.head;
            while (currentNode) {
                actualValues.push(currentNode.value);
                currentNode = currentNode.next;
            }

            // Assert
            expect(actualValues).toEqual(values);
        });
    });

    describe('shift', function () {
        it('should remove the first element and return it', function () {
            const list = new LinkedList<number>();
            list.append(1);
            list.append(2);
            list.append(3);

            const removed = list.shift();

            expect(removed?.value).toBe(1);
        });

        it('should update the head to the next element after removal', function () {
            const list = new LinkedList<number>();
            list.append(1);
            list.append(2);
            list.append(3);

            list.shift();

            expect(list.head?.value).toBe(2);
        });

        it('should update the tail to the new head after removal if the list had only one element', function () {
            const list = new LinkedList();
            list.append(1);

            list.shift();

            expect(list.tail).toBe(list.head);
        });

        it('should return null if the list is empty', function () {
            const list = new LinkedList<number>();

            const removed = list.shift();

            expect(removed).toBeNull();
        });

        it('should return null after multiple shifts if the list is empty', function () {
            const list = new LinkedList<number>();
            list.append(1);

            expect(list.shift()?.value).toBe(1);
            expect(list.shift()).toBeNull();
        });
    });

    describe('moveToTail', () => {
        it('should move the given node to the tail of the list', () => {
            const list = new LinkedList<number>();

            const node1 = list.append(1);
            const node2 = list.append(2);
            const node3 = list.append(3);

            expect(list.tail).toBe(node3);

            list.moveToTail(node2);

            expect(list.tail).toBe(node2);
            expect(list.head).toBe(node1);
        });

        it('should handle a node being moved to the tail it is already at', () => {
            const list = new LinkedList<number>();

            const node1 = list.append(1);
            const node2 = list.append(2);

            list.moveToTail(node1);
            list.moveToTail(node2);

            expect(list.tail).toBe(node2);
            expect(list.head).toBe(node1);
        });

        it('should handle a node being moved from the head to the tail', () => {
            const list = new LinkedList<number>();

            const node1 = list.append(1);
            const node2 = list.append(2);

            list.moveToTail(node1);

            expect(list.tail).toBe(node1);
            expect(list.head).toBe(node2);
        });

        it('should handle a node being moved from a middle of the list to the tail', () => {
            const list = new LinkedList<number>();

            list.append(1);
            const node2 = list.append(2);
            list.append(3);

            list.moveToTail(node2);

            expect(list.tail).toBe(node2);
            expect(list.head?.value).toBe(1);
        });

        it('should handle a node being moved from the tail to the tail', () => {
            const list = new LinkedList<number>();

            list.append(1);
            const node2 = list.append(2);
            const node3 = list.append(3);

            list.moveToTail(node3);

            expect(list.tail).toBe(node3);
            expect(list.head?.value).toBe(1);
            expect(node2.next).toBe(node3);
        });
    });
});