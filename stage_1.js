/**
 * Stage 1: Priority Inbox Algorithm
 * 
 * Objective: Maintain the top 10 most important unread notifications efficiently.
 * Priority rules: 
 *   1. Weight: Placement > Result > Event
 *   2. Recency: Newer timestamp is better
 * 
 * Data Structure: Min-Heap of size 10.
 * Why? A min-heap allows us to efficiently keep track of the "smallest" (lowest priority)
 * element among our top 10. When a new notification arrives, we compare it against the
 * minimum. If it's higher priority, we pop the min and insert the new one.
 * Time Complexity: O(log K) per insertion, where K is 10. Space Complexity: O(K).
 */

const WEIGHTS = {
  'placement': 3,
  'result': 2,
  'event': 1
};

// Returns > 0 if A is higher priority than B
// Returns < 0 if B is higher priority than A
function comparePriority(a, b) {
  const weightA = WEIGHTS[a.Type.toLowerCase()] || 0;
  const weightB = WEIGHTS[b.Type.toLowerCase()] || 0;

  if (weightA !== weightB) {
    return weightA - weightB;
  }
  
  // If weights are equal, newer timestamp wins
  const timeA = new Date(a.Timestamp).getTime();
  const timeB = new Date(b.Timestamp).getTime();
  return timeA - timeB;
}

class TopKNotifications {
  constructor(k = 10) {
    this.k = k;
    this.heap = []; // Min-Heap
  }

  // Get parent/child indices
  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // Move element up to maintain min-heap property
  heapifyUp(index) {
    let current = index;
    while (current > 0) {
      let parent = this.getParentIndex(current);
      // If current is LESS priority than parent, swap
      if (comparePriority(this.heap[current], this.heap[parent]) < 0) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  // Move element down to maintain min-heap property
  heapifyDown(index) {
    let current = index;
    const length = this.heap.length;

    while (this.getLeftChildIndex(current) < length) {
      let smallestChild = this.getLeftChildIndex(current);
      let rightChild = this.getRightChildIndex(current);

      if (rightChild < length && comparePriority(this.heap[rightChild], this.heap[smallestChild]) < 0) {
        smallestChild = rightChild;
      }

      if (comparePriority(this.heap[smallestChild], this.heap[current]) < 0) {
        this.swap(current, smallestChild);
        current = smallestChild;
      } else {
        break;
      }
    }
  }

  // Add a new notification
  add(notification) {
    if (this.heap.length < this.k) {
      this.heap.push(notification);
      this.heapifyUp(this.heap.length - 1);
    } else {
      // If the new notification is higher priority than the lowest-priority item in our top 10
      if (comparePriority(notification, this.heap[0]) > 0) {
        this.heap[0] = notification;
        this.heapifyDown(0);
      }
    }
  }

  // Return the top K sorted by priority (highest first)
  getTopNotifications() {
    // Sort descending for display (highest priority first)
    return [...this.heap].sort((a, b) => comparePriority(b, a));
  }
}

// ==========================================
// Test Execution
// ==========================================
if (require.main === module) {
  const streamOfNotifications = [
    { ID: "1", Type: "Event", Message: "Tech fest", Timestamp: "2026-04-22 17:50:06" },
    { ID: "2", Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:50:54" },
    { ID: "3", Type: "Placement", Message: "AMD hiring", Timestamp: "2026-04-22 17:49:42" },
    { ID: "4", Type: "Placement", Message: "TCS hiring", Timestamp: "2026-04-23 10:00:00" }, // Higher priority than 3 due to recency
    { ID: "5", Type: "Event", Message: "Farewell", Timestamp: "2026-04-22 17:51:06" },
    { ID: "6", Type: "Result", Message: "Finals", Timestamp: "2026-04-24 09:00:00" },
    { ID: "7", Type: "Event", Message: "Guest Lecture", Timestamp: "2026-04-25 14:00:00" },
    { ID: "8", Type: "Placement", Message: "Google hiring", Timestamp: "2026-04-20 10:00:00" },
    { ID: "9", Type: "Result", Message: "Quiz 1", Timestamp: "2026-04-21 10:00:00" },
    { ID: "10", Type: "Event", Message: "Hackathon", Timestamp: "2026-04-26 10:00:00" },
    { ID: "11", Type: "Placement", Message: "Microsoft hiring", Timestamp: "2026-04-26 10:00:00" }, // Will push out something else
  ];

  const inbox = new TopKNotifications(5); // Testing with top 5 for simplicity

  console.log("Simulating incoming notification stream...");
  streamOfNotifications.forEach(n => inbox.add(n));

  console.log("\nTop 5 Notifications in Priority Inbox:");
  inbox.getTopNotifications().forEach((n, idx) => {
    console.log(`${idx + 1}. [${n.Type}] ${n.Message} (${n.Timestamp})`);
  });
}

module.exports = { TopKNotifications, comparePriority };
