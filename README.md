# js-caches 
[![GitHub](https://img.shields.io/github/license/algok-876/js-caches)](https://github.com/algok-876/js-caches/blob/master/LICENSE)
[![Static Badge](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/js-caches)
[![Coverage Status](https://coveralls.io/repos/github/algok-876/js-caches/badge.svg)](https://coveralls.io/github/algok-876/js-caches)


js-caches 缓存库提供了三种高效的缓存策略：最近最少使用（LRU）、先进先出（FIFO）和最不经常使用（LFU）。它旨在帮助开发者轻松地在他们的应用程序中实现数据缓存机制，从而提高性能和响应速度。

## 安装

### 通过NPM安装
```bash
$ npm install js-caches
```

## 快速开始
```ts
import { LRUCahche, FIFOCache, LFUCache } from 'js-caches';

const cache = new LRUCahche<number, number>(3);
cache.put(1, 9);
cache.put(2, 8);
cache.put(3, 7);
cache.put(4, 6); // 超出最大缓存容量，淘汰key为1的缓存（最近最少使用）
cache.has(1) // false
cache.get(1) // null

cache.get(2); // key为2的缓存成为最近使用的缓存
cache.put(5, 10);  // 超出最大缓存容量，淘汰key为3的缓存（最近最少使用）
cache.has(3) // false
cache.get(3)) // null
```
## 缓存策略
### LRU
LRU（Least Recently Used）缓存是一种常用的缓存淘汰策略，它的核心思想是当缓存达到最大容量时，优先淘汰最长时间未被使用的数据项。这种策略基于一个假设，即最近使用过的数据在未来被再次访问的概率比较早之前使用过的数据要高。

### LFU
LFU（Least Frequently Used）缓存是一种基于访问频率来淘汰数据的缓存淘汰策略。与LRU（Least Recently Used）策略不同，LFU关注点在于数据项被访问的频率，而不是访问的时间点。LFU缓存策略的核心思想是当缓存容量达到限制时，优先淘汰那些访问频率最低的数据项。

### FIFO
FIFO（First-In, First-Out）缓存是一种简单的缓存淘汰策略，其核心思想是按照数据项进入缓存的顺序进行淘汰。当缓存达到其容量上限时，最先进入缓存的数据项将被首先移除，以腾出空间给新的数据项。这种策略类似于现实生活中的队列操作，即最先进入队列的人最先得到服务并离开队列。

## API
### new
实例化一个缓存对象
#### 参数
- capacity: 最大缓存容量
#### 返回值: 实例化后的缓存对象

### get(key)
根据提供的键(key)从缓存中检索一个值。如果键存在，则返回对应的值；如果不存在，则返回null
#### 参数
- key: 需要检索的键，通常是一个字符串或者可以作为键的任何类型
#### 返回值: 键对应的值，键不存在时返回null

### put(key, value)
将一个值(value)与一个键(key)关联并加入到缓存中。如果缓存已经达到其配置的最大容量，则根据缓存策略（LRU、FIFO、LFU）淘汰一个现有的项目

#### 参数
- key: 要设置的键
- value: 与键关联的值

#### 返回值: 无。

### has(key)
检查缓存中是否存在指定的键(key)

#### 参数
- key: 需要检查是否存在的键

#### 返回值
- true: 如果缓存中存在该键
- false: 如果缓存中不存在该键

## 贡献
欢迎贡献！如果你有好的想法或者发现了bug，请通过issue或者pull request与我联系

## 许可证
这个项目采用 [MIT许可证](https://github.com/algok-876/js-caches/blob/master/LICENSE)
