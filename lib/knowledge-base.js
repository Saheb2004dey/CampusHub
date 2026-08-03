// Mock knowledge base simulating uploaded, chunked & embedded course notes.
// In production this is replaced by a real vector store (e.g. ChromaDB) with
// semantic embeddings. Here we use lightweight keyword-overlap scoring so the
// Doubt Solver can retrieve relevant context and compute a confidence score.

export const KNOWLEDGE_BASE = [
  {
    id: "os-1",
    subject: "Operating Systems",
    title: "OS Unit 3 — Deadlocks",
    page: 12,
    content:
      "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process. The four necessary (Coffman) conditions for deadlock are mutual exclusion, hold and wait, no preemption, and circular wait. All four must hold simultaneously for a deadlock to occur.",
  },
  {
    id: "os-2",
    subject: "Operating Systems",
    title: "OS Unit 3 — Deadlocks",
    page: 14,
    content:
      "Deadlock handling strategies include prevention (ensuring at least one Coffman condition cannot hold), avoidance (using the Banker's algorithm to keep the system in a safe state), detection and recovery (allowing deadlocks then resolving them), and the ostrich algorithm (ignoring the problem).",
  },
  {
    id: "os-3",
    subject: "Operating Systems",
    title: "OS Unit 2 — CPU Scheduling",
    page: 7,
    content:
      "CPU scheduling algorithms decide which process runs next. Common algorithms are First Come First Serve (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin. Round Robin uses a fixed time quantum and is preemptive, giving good response time for time-sharing systems.",
  },
  {
    id: "dbms-1",
    subject: "DBMS",
    title: "DBMS Unit 4 — Normalization",
    page: 21,
    content:
      "Normalization is the process of organizing data to reduce redundancy and improve data integrity. First Normal Form (1NF) requires atomic values. Second Normal Form (2NF) removes partial dependencies. Third Normal Form (3NF) removes transitive dependencies. BCNF is a stricter version of 3NF.",
  },
  {
    id: "dbms-2",
    subject: "DBMS",
    title: "DBMS Unit 5 — Transactions",
    page: 30,
    content:
      "A transaction is a unit of work that must satisfy the ACID properties: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions do not interfere), and Durability (committed changes persist). Concurrency control uses locking protocols like two-phase locking (2PL).",
  },
  {
    id: "dsa-1",
    subject: "Data Structures",
    title: "DSA Unit 2 — Trees",
    page: 45,
    content:
      "A binary search tree (BST) is a binary tree where the left subtree contains keys less than the node and the right subtree contains keys greater than the node. Average time complexity for search, insert, and delete is O(log n), but degrades to O(n) for a skewed tree. Balanced variants include AVL trees and Red-Black trees.",
  },
  {
    id: "dsa-2",
    subject: "Data Structures",
    title: "DSA Unit 3 — Graphs",
    page: 58,
    content:
      "Graph traversal algorithms include Breadth First Search (BFS), which uses a queue and explores level by level, and Depth First Search (DFS), which uses a stack or recursion. Dijkstra's algorithm finds the shortest path in a weighted graph with non-negative edges using a priority queue.",
  },
  {
    id: "cn-1",
    subject: "Computer Networks",
    title: "CN Unit 1 — OSI Model",
    page: 3,
    content:
      "The OSI model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. The TCP/IP model condenses these into four layers. The Transport layer (TCP/UDP) provides end-to-end communication; TCP is reliable and connection-oriented while UDP is connectionless.",
  },
]

const STOPWORDS = new Set([
  "the","a","an","is","are","of","to","and","in","on","for","what","how","why",
  "explain","define","describe","tell","me","about","do","does","with","that",
  "this","it","can","you","i","my","between","difference","list","give",
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
}

// Retrieve the most relevant note chunks for a query and compute a confidence
// score (0-100) based on how strongly the query matches the knowledge base.
export function retrieve(query, topK = 3) {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) {
    return { sources: [], confidence: 0 }
  }

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    const chunkTokens = new Set(tokenize(chunk.content + " " + chunk.title + " " + chunk.subject))
    let matches = 0
    for (const token of queryTokens) {
      if (chunkTokens.has(token)) matches++
    }
    const score = matches / queryTokens.length
    return { chunk, score }
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  const sources = scored.map(({ chunk, score }) => ({
    id: chunk.id,
    subject: chunk.subject,
    title: chunk.title,
    page: chunk.page,
    snippet: chunk.content.length > 160 ? chunk.content.slice(0, 157) + "..." : chunk.content,
    score,
  }))

  // Confidence blends the best match strength with retrieval coverage.
  const topScore = scored.length > 0 ? scored[0].score : 0
  const coverage = Math.min(scored.length / topK, 1)
  const confidence = Math.round(Math.min(topScore * 0.75 + coverage * 0.25, 1) * 100)

  return { sources, confidence }
}
