# Notification System Design

## Overview
This document explains the design and logic behind the notification system that prioritizes and sorts notifications for display.

---

## 1. Priority Logic

### Priority Rules
Notifications are classified into three types with different priority levels:

| Type | Priority Level | Description |
|------|---|---|
| **Placement** | 3 (Highest) | Job placement, interview, and recruitment notifications |
| **Result** | 2 (Medium) | Academic results, grades, and exam outcomes |
| **Event** | 1 (Lowest) | General events, meetups, and announcements |

### Why This Priority?
- **Placement** is given highest priority because it's critical for career decisions
- **Result** is medium priority as it affects academic progress
- **Event** is lowest priority as it's informational but less time-sensitive

---

## 2. Sorting Logic

### Two-Level Sorting Approach

**Step 1: Sort by Priority (Primary)**
- Higher priority notifications appear first
- If two notifications have the same priority, move to Step 2

**Step 2: Sort by Timestamp (Secondary)**
- Among notifications with the same priority, newer notifications appear first
- Latest timestamp = Most recent = First position

### Sorting Algorithm (Comparator Function)

```javascript
function sortNotifications(notifications) {
  return notifications.sort((a, b) => {
    // Compare by priority first (higher priority first)
    const priorityDiff = PRIORITY_LEVELS[b.type] - PRIORITY_LEVELS[a.type];
    if (priorityDiff !== 0) return priorityDiff;

    // If same priority, compare by timestamp (newer first)
    return b.timestamp - a.timestamp;
  });
}
```

### Example:
```
Input:
1. Placement (10:00 AM)
2. Event (10:30 AM)
3. Placement (09:00 AM)
4. Result (10:15 AM)

Output (After Sorting):
1. Placement (10:00 AM)      ← Highest priority, latest Placement
2. Placement (09:00 AM)      ← Same priority, older Placement
3. Result (10:15 AM)         ← Medium priority
4. Event (10:30 AM)          ← Lowest priority
```

---

## 3. Top 10 Logic

### What is Top 10?
The Top 10 Notifications are the first 10 notifications from the sorted list.

### Process:
1. **Sort** all notifications using the two-level sorting
2. **Select** the first 10 items from the sorted array
3. **Display** these 10 items to the user

### Implementation:

```javascript
function getTopNotifications(notifications, limit = 10) {
  const sortedNotifications = sortNotifications(notifications);
  return sortedNotifications.slice(0, limit);
}
```

### Why Top 10?
- Prevents information overload for users
- Shows the most important notifications on the screen
- Improves performance by reducing data processing

---

## 4. Min Heap Optimization

### What is a Min Heap?
A **Min Heap** is a tree structure where:
- Parent nodes are smaller than child nodes
- The smallest element is always at the root (top)

### How Can It Optimize Our System?

**Standard Sorting Approach:**
- Sort all notifications (Time: O(n log n))
- Get top 10 (Time: O(1))
- Total: O(n log n)

**Min Heap Approach:**
- Create a Min Heap of size 10
- Add all notifications to heap while maintaining top 10 largest
- Get top 10 (Time: O(1))
- Total: O(n log 10) = O(n)

### When to Use Min Heap?
- Use when you need top K elements from large dataset
- Use when performance is critical
- Use when you want to avoid storing all items in memory

### Min Heap Implementation Example:

```javascript
// Min Heap for getting top K elements
class MinHeap {
  constructor(comparator) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Add element while maintaining heap size of K
  addElement(element, k) {
    if (this.heap.length < k) {
      this.heap.push(element);
      this.bubbleUp(this.heap.length - 1);
    } else if (this.comparator(element, this.heap[0]) > 0) {
      this.heap[0] = element;
      this.bubbleDown(0);
    }
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = 
        [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else break;
    }
  }

  bubbleDown(index) {
    while (2 * index + 1 < this.heap.length) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (this.comparator(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < this.heap.length && 
          this.comparator(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = 
        [this.heap[smallest], this.heap[index]];
        index = smallest;
      } else break;
    }
  }
}
```

---

## 5. Time Complexity

### Standard Sorting Approach

| Operation | Time Complexity | Reason |
|---|---|---|
| Generate Notifications | O(n) | Create n notifications |
| Sort Notifications | O(n log n) | JavaScript sort algorithm (Quicksort/Mergesort) |
| Get Top 10 | O(1) | Array slice (returns reference) |
| **Total** | **O(n log n)** | Sorting dominates |

### Space Complexity

| Operation | Space Complexity | Reason |
|---|---|---|
| Store Notifications | O(n) | Store n notification objects |
| Sorted Array | O(n) | Create new sorted array |
| **Total** | **O(n)** | Linear space for storage |

### Min Heap Approach

| Operation | Time Complexity | Space Complexity |
|---|---|---|
| Generate Notifications | O(n) | O(n) |
| Maintain Heap of size 10 | O(n log 10) = O(n) | O(10) = O(1) |
| Get Top 10 | O(1) | O(1) |
| **Total** | **O(n)** | **O(1)** |

### Comparison

```
For n = 1,000,000 notifications:

Standard Sorting:
- Time: 1,000,000 × log(1,000,000) ≈ 20,000,000 operations
- Space: 1,000,000 objects in memory

Min Heap:
- Time: 1,000,000 × log(10) ≈ 3,321,928 operations
- Space: 10 objects in memory

Improvement: 6x faster, 100,000x less memory!
```

---

## 6. Algorithm Visualization

### Step-by-Step Process

```
Input: 15 notifications (mixed types and timestamps)
                          ↓
                  SORT BY PRIORITY
                          ↓
        ┌─────────────────┬─────────────────┐
        ↓                 ↓                 ↓
   Placement (3)      Result (2)       Event (1)
   [P1, P2, P3]       [R1, R2, R3]     [E1, E2, E3]
        ↓                 ↓                 ↓
   SORT BY TIME (newest first)
        ↓
   [P1(10:00), P2(09:00), P3(08:00), R1(10:15), R2(09:30), ...]
        ↓
     SELECT TOP 10
        ↓
   [Top 10 Final List]
```

---

## 7. Key Takeaways

✅ **Priority Logic:** 3-level priority system based on notification importance

✅ **Sorting:** Two-level sort - Priority first, Timestamp second

✅ **Top 10:** Extract first 10 from sorted list

✅ **Min Heap:** Optimize for large datasets by maintaining only top K elements

✅ **Time Complexity:** O(n log n) for sorting, O(n) for min heap

✅ **Use Cases:**
- Sorting: Small to medium datasets (< 10,000 items)
- Min Heap: Large datasets (> 100,000 items)

---

## 8. Real-World Applications

1. **Email Inboxes:** Priority inbox showing most important emails first
2. **News Feed:** Show trending/important posts first
3. **Task Management:** Display high-priority tasks at the top
4. **Stock Alerts:** Show critical price changes first
5. **Hospital Systems:** Show critical patient alerts first

