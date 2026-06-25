# Stage 1

## Priority Inbox Architecture & Approach

### The Problem
The campus notifications application has a high volume of notifications, causing users to lose track of important alerts. A Priority Inbox must display the top 'n' most important unread notifications. Priority is determined by:
1. **Weight**: `Placement` > `Result` > `Event`
2. **Recency**: Newer notifications have higher priority when weights are equal.
Additionally, we need a solution capable of handling a continuous stream of new incoming notifications efficiently.

### Our Solution: Min-Heap (Priority Queue)
To maintain the top $N$ elements efficiently from a continuous stream, we use a **Min-Heap of size N**.

#### Why a Min-Heap?
If we simply stored all incoming notifications in an array and sorted them every time a user visited their inbox, the time complexity would be $O(M \log M)$, where $M$ is the total number of unread notifications. As the system scales, $M$ grows indefinitely.

By maintaining a Min-Heap of a fixed size $N$ (e.g., $N=10$):
- The heap stores *only* the top $N$ notifications encountered so far.
- The root of the Min-Heap always holds the **lowest priority** notification currently in the top $N$.
- When a new notification arrives, we simply compare it to the root.
  - If the new notification is lower or equal in priority to the root, we ignore it.
  - If the new notification is higher priority, we pop the root and push the new notification.
- **Time Complexity:** $O(\log N)$ per insertion. Since $N \le 20$, this operation is incredibly fast and essentially $O(1)$ constant time regardless of how many millions of notifications stream in.
- **Space Complexity:** $O(N)$ strictly bounds our memory footprint per user priority inbox stream.

#### Priority Comparison Logic
We define a weighting system:
- `Placement` = 3
- `Result` = 2
- `Event` = 1

For any two notifications $A$ and $B$:
1. If `Weight(A) > Weight(B)`, $A$ is higher priority.
2. If `Weight(A) == Weight(B)`, we compare their ISO timestamps. The newer timestamp is higher priority.

This guarantees absolute sorting reliability tailored to the business requirements.

### Implementation Reference
The algorithmic implementation for this is available in `stage_1.js` in this repository, providing a fully functioning, zero-dependency `TopKNotifications` Min-Heap class.
