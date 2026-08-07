"use client"

import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DocumentCard } from "./document-card"
import { UploadModal } from "./upload-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DocumentPreviewModal,
  AskAIModal,
  GenerateQuizModal,
  KeyPointsModal,
} from "./document-action-modals"
import {
  BookOpen,
  Upload,
  Folder,
  Database,
  Sparkles,
  CheckCircle2,
  Search,
  ChevronDown,
  FileText,
  Star,
  ArrowRight,
  MessageSquare,
  ListChecks,
  Clock,
  ChevronRight,
  HelpCircle,
  X,
  Check,
} from "lucide-react"

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [sortBy, setSortBy] = useState("Most Recent")

  // Modal Action States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [previewModalDoc, setPreviewModalDoc] = useState(null)
  const [askAIModalDoc, setAskAIModalDoc] = useState(null)
  const [quizModalDoc, setQuizModalDoc] = useState(null)
  const [keyPointsModalDoc, setKeyPointsModalDoc] = useState(null)

  // 15 Document Categories
  const initialCategories = [
    "All",
    "Course Notes",
    "Textbooks",
    "Previous Papers",
    "Question Banks",
    "Assignments",
    "Lab Manuals",
  ]

  const moreCategories = [
    "Lecture Slides",
    "Syllabus",
    "Study Guides",
    "Cheat Sheets",
    "Programming Resources",
    "Research Papers",
    "Important Questions",
    "Lab/Viva Materials",
    "Exam Materials",
  ]

  // Realistic B.Tech CSE Mock Documents (2+ per category across all 15 categories)
  const [documents, setDocuments] = useState([
    // 1. Course Notes
    {
      id: 1,
      title: "Data Structures & Algorithms Notes",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Course Notes",
      fileType: "PDF",
      fileSize: "4.2 MB",
      pageCount: "48 pages",
      updatedDate: "Updated 2 days ago by Aarav Sharma",
      timestamp: 2,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 2,
      title: "Database Management Systems Notes",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Course Notes",
      fileType: "DOCX",
      fileSize: "3.8 MB",
      pageCount: "36 pages",
      updatedDate: "Updated 1 day ago by Aarav Sharma",
      timestamp: 1,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 2. Textbooks
    {
      id: 3,
      title: "Data Structures and Algorithms Book",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Textbooks",
      fileType: "PDF",
      fileSize: "14.5 MB",
      pageCount: "420 pages",
      updatedDate: "Updated 1 week ago by Prof. Iyer",
      timestamp: 7,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 4,
      title: "Java Programming Fundamentals",
      subject: "Programming",
      fullSubject: "Object Oriented Programming",
      category: "Textbooks",
      fileType: "PDF",
      fileSize: "18.2 MB",
      pageCount: "512 pages",
      updatedDate: "Updated 3 days ago by Prof. Iyer",
      timestamp: 3,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },

    // 3. Previous Papers
    {
      id: 5,
      title: "DBMS Semester 5 PYQ",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Previous Papers",
      fileType: "PDF",
      fileSize: "2.1 MB",
      pageCount: "12 pages",
      updatedDate: "Updated 4 days ago by Aarav Sharma",
      timestamp: 4,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 6,
      title: "Operating Systems University 2025 Paper",
      subject: "OS",
      fullSubject: "Operating Systems",
      category: "Previous Papers",
      fileType: "PDF",
      fileSize: "1.8 MB",
      pageCount: "8 pages",
      updatedDate: "Updated 2 weeks ago by Dept. Head",
      timestamp: 14,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-purple-500/10 text-purple-500",
    },

    // 4. Question Banks
    {
      id: 7,
      title: "DBMS Question Bank",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Question Banks",
      fileType: "PDF",
      fileSize: "3.4 MB",
      pageCount: "28 pages",
      updatedDate: "Updated 3 days ago by Prof. Iyer",
      timestamp: 3,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 8,
      title: "DSA Important Questions",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Question Banks",
      fileType: "DOCX",
      fileSize: "2.6 MB",
      pageCount: "22 pages",
      updatedDate: "Updated yesterday by Aarav Sharma",
      timestamp: 1,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 5. Assignments
    {
      id: 9,
      title: "DSA Assignment 3 - Dynamic Programming",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Assignments",
      fileType: "PDF",
      fileSize: "1.2 MB",
      pageCount: "5 pages",
      updatedDate: "Updated 1 day ago by Prof. Iyer",
      timestamp: 1,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 10,
      title: "DBMS Assignment 2 - SQL Triggers & Procedures",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Assignments",
      fileType: "DOCX",
      fileSize: "1.5 MB",
      pageCount: "6 pages",
      updatedDate: "Updated 3 days ago by Prof. Iyer",
      timestamp: 3,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 6. Lab Manuals
    {
      id: 11,
      title: "DBMS Lab Manual",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Lab Manuals",
      fileType: "PDF",
      fileSize: "5.6 MB",
      pageCount: "45 pages",
      updatedDate: "Updated 1 week ago by Lab Admin",
      timestamp: 7,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 12,
      title: "Python Programming Lab Manual",
      subject: "Programming",
      fullSubject: "Python Programming",
      category: "Lab Manuals",
      fileType: "PDF",
      fileSize: "4.8 MB",
      pageCount: "38 pages",
      updatedDate: "Updated 4 days ago by Lab Admin",
      timestamp: 4,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },

    // 7. Lecture Slides
    {
      id: 13,
      title: "Machine Learning Fundamentals Slides",
      subject: "ML",
      fullSubject: "Machine Learning",
      category: "Lecture Slides",
      fileType: "PPTX",
      fileSize: "8.6 MB",
      pageCount: "64 slides",
      updatedDate: "Updated today by Aarav Sharma",
      timestamp: 0,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-amber-500/10 text-amber-500",
    },
    {
      id: 14,
      title: "Computer Networks TCP/IP Architecture Slides",
      subject: "CN",
      fullSubject: "Computer Networks",
      category: "Lecture Slides",
      fileType: "PPTX",
      fileSize: "9.2 MB",
      pageCount: "55 slides",
      updatedDate: "Updated 2 days ago by Prof. Iyer",
      timestamp: 2,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-amber-500/10 text-amber-500",
    },

    // 8. Syllabus
    {
      id: 15,
      title: "B.Tech CSE Semester 5 Syllabus",
      subject: "General",
      fullSubject: "Computer Science & Engineering",
      category: "Syllabus",
      fileType: "PDF",
      fileSize: "850 KB",
      pageCount: "14 pages",
      updatedDate: "Updated 1 month ago by Academic Cell",
      timestamp: 30,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 16,
      title: "Algorithms & Data Structures Curriculum Map",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Syllabus",
      fileType: "PDF",
      fileSize: "620 KB",
      pageCount: "8 pages",
      updatedDate: "Updated 2 weeks ago by Dept. Head",
      timestamp: 14,
      isBookmarked: false,
      summaryAvailable: false,
      iconBg: "bg-red-500/10 text-red-500",
    },

    // 9. Study Guides
    {
      id: 17,
      title: "Operating Systems Midterm Study Guide",
      subject: "OS",
      fullSubject: "Operating Systems",
      category: "Study Guides",
      fileType: "PDF",
      fileSize: "3.1 MB",
      pageCount: "24 pages",
      updatedDate: "Updated 5 days ago by Aarav Sharma",
      timestamp: 5,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-purple-500/10 text-purple-500",
    },
    {
      id: 18,
      title: "Computer Networks Exam Survival Guide",
      subject: "CN",
      fullSubject: "Computer Networks",
      category: "Study Guides",
      fileType: "DOCX",
      fileSize: "2.9 MB",
      pageCount: "20 pages",
      updatedDate: "Updated 3 days ago by Aarav Sharma",
      timestamp: 3,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 10. Cheat Sheets
    {
      id: 19,
      title: "DSA Formulas & Complexity Cheat Sheet",
      subject: "DSA",
      fullSubject: "Data Structures & Algorithms",
      category: "Cheat Sheets",
      fileType: "PDF",
      fileSize: "1.1 MB",
      pageCount: "4 pages",
      updatedDate: "Updated 2 days ago by Aarav Sharma",
      timestamp: 2,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 20,
      title: "SQL Commands & Normalization Quick Reference",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Cheat Sheets",
      fileType: "PDF",
      fileSize: "980 KB",
      pageCount: "3 pages",
      updatedDate: "Updated 1 day ago by Aarav Sharma",
      timestamp: 1,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },

    // 11. Programming Resources
    {
      id: 21,
      title: "C++ STL & Competitive Programming Guide",
      subject: "Programming",
      fullSubject: "Competitive Programming",
      category: "Programming Resources",
      fileType: "PDF",
      fileSize: "6.4 MB",
      pageCount: "72 pages",
      updatedDate: "Updated 4 days ago by Aarav Sharma",
      timestamp: 4,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 22,
      title: "Python Data Science & NumPy Cheatbook",
      subject: "ML",
      fullSubject: "Machine Learning & Python",
      category: "Programming Resources",
      fileType: "DOCX",
      fileSize: "4.1 MB",
      pageCount: "34 pages",
      updatedDate: "Updated 6 days ago by Aarav Sharma",
      timestamp: 6,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 12. Research Papers
    {
      id: 23,
      title: "Attention Is All You Need - Transformer Paper",
      subject: "ML",
      fullSubject: "Artificial Intelligence",
      category: "Research Papers",
      fileType: "PDF",
      fileSize: "2.8 MB",
      pageCount: "15 pages",
      updatedDate: "Updated 2 weeks ago by Prof. Iyer",
      timestamp: 14,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 24,
      title: "Distributed Consensus & Raft Protocol Paper",
      subject: "OS",
      fullSubject: "Operating Systems",
      category: "Research Papers",
      fileType: "PDF",
      fileSize: "3.2 MB",
      pageCount: "18 pages",
      updatedDate: "Updated 1 week ago by Prof. Iyer",
      timestamp: 7,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-purple-500/10 text-purple-500",
    },

    // 13. Important Questions
    {
      id: 25,
      title: "DBMS Unit-wise Top 50 Viva Questions",
      subject: "DBMS",
      fullSubject: "Database Management Systems",
      category: "Important Questions",
      fileType: "PDF",
      fileSize: "1.9 MB",
      pageCount: "16 pages",
      updatedDate: "Updated 3 days ago by Aarav Sharma",
      timestamp: 3,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: 26,
      title: "Operating Systems End-Sem Master Question List",
      subject: "OS",
      fullSubject: "Operating Systems",
      category: "Important Questions",
      fileType: "DOCX",
      fileSize: "2.2 MB",
      pageCount: "18 pages",
      updatedDate: "Updated 5 days ago by Dept. Head",
      timestamp: 5,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },

    // 14. Lab/Viva Materials
    {
      id: 27,
      title: "Computer Networks Cisco Packet Tracer Labs",
      subject: "CN",
      fullSubject: "Computer Networks",
      category: "Lab/Viva Materials",
      fileType: "PDF",
      fileSize: "7.8 MB",
      pageCount: "50 pages",
      updatedDate: "Updated 1 week ago by Lab Admin",
      timestamp: 7,
      isBookmarked: false,
      summaryAvailable: true,
      iconBg: "bg-blue-500/10 text-blue-500",
    },
    {
      id: 28,
      title: "Unix Shell Scripting & Command Viva Notes",
      subject: "OS",
      fullSubject: "Operating Systems",
      category: "Lab/Viva Materials",
      fileType: "PDF",
      fileSize: "3.5 MB",
      pageCount: "26 pages",
      updatedDate: "Updated 4 days ago by Lab Admin",
      timestamp: 4,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-purple-500/10 text-purple-500",
    },

    // 15. Exam Materials
    {
      id: 29,
      title: "CSE Final Year Project Blueprint & Exam Kit",
      subject: "General",
      fullSubject: "Computer Science & Engineering",
      category: "Exam Materials",
      fileType: "PDF",
      fileSize: "12.4 MB",
      pageCount: "88 pages",
      updatedDate: "Updated 2 weeks ago by Dept. Head",
      timestamp: 14,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 30,
      title: "GATE Computer Science Complete Revision Kit 2026",
      subject: "General",
      fullSubject: "Computer Science & Engineering",
      category: "Exam Materials",
      fileType: "PDF",
      fileSize: "22.1 MB",
      pageCount: "210 pages",
      updatedDate: "Updated 3 days ago by Prof. Iyer",
      timestamp: 3,
      isBookmarked: true,
      summaryAvailable: true,
      iconBg: "bg-red-500/10 text-red-500",
    },
  ])

  // Load saved bookmarks from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("campushub_kb_bookmarks")
      if (saved) {
        const bookmarkedIds = new Set(JSON.parse(saved))
        setDocuments((prevDocs) =>
          prevDocs.map((doc) => ({
            ...doc,
            isBookmarked: bookmarkedIds.has(doc.id) || doc.isBookmarked,
          }))
        )
      }
    } catch (e) {
      // Ignore SSR storage issues
    }
  }, [])

  // Toggle bookmark state handler with localStorage sync
  const handleToggleBookmark = (id) => {
    setDocuments((prevDocs) => {
      const updated = prevDocs.map((doc) =>
        doc.id === id ? { ...doc, isBookmarked: !doc.isBookmarked } : doc
      )
      try {
        const bookmarkedIds = updated
          .filter((d) => d.isBookmarked)
          .map((d) => d.id)
        localStorage.setItem("campushub_kb_bookmarks", JSON.stringify(bookmarkedIds))
      } catch (e) {
        // Ignore
      }
      return updated
    })
  }

  const [toastMessage, setToastMessage] = useState(null)

  // Handle mock file download and toast notification
  const handleDownload = (doc) => {
    if (!doc) return
    const fileExt = (doc.fileType || "pdf").toLowerCase()
    const filename = `${doc.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${fileExt}`

    try {
      const blob = new Blob(
        [
          `CampusHub Knowledge Base Document\nTitle: ${doc.title}\nCategory: ${doc.category}\nSubject: ${doc.fullSubject || doc.subject}\nType: ${doc.fileType}`,
        ],
        { type: "text/plain" }
      )
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      // Fallback
    }

    setToastMessage(`Downloading "${doc.title}"... Saved to your device!`)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Rename Document Handler
  const handleRenameDocument = (id) => {
    const target = documents.find((d) => d.id === id)
    if (!target) return
    const newTitle = window.prompt("Enter new document title:", target.title)
    if (newTitle && newTitle.trim() && newTitle.trim() !== target.title) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, title: newTitle.trim() } : d))
      )
      setToastMessage(`Renamed document to "${newTitle.trim()}"`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  // Move Document Category Handler
  const handleMoveCategory = (id) => {
    const target = documents.find((d) => d.id === id)
    if (!target) return
    const newCategory = window.prompt(
      "Enter target category (e.g. Course Notes, Textbooks, Cheat Sheets):",
      target.category || "Course Notes"
    )
    if (newCategory && newCategory.trim() && newCategory.trim() !== target.category) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, category: newCategory.trim() } : d))
      )
      setToastMessage(`Moved "${target.title}" to category "${newCategory.trim()}"`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  // Delete Document Handler with Confirmation
  const handleDeleteDocument = (id) => {
    const target = documents.find((d) => d.id === id)
    if (!target) return
    const confirmed = window.confirm(`Are you sure you want to delete "${target.title}"?`)
    if (confirmed) {
      setDocuments((prev) => prev.filter((d) => d.id !== id))
      setToastMessage(`Deleted "${target.title}" from Knowledge Base`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  // Handle addition of new uploaded document
  const handleUploadComplete = (newDoc) => {
    setDocuments((prevDocs) => [newDoc, ...prevDocs])
  }

  // Derive bookmarked items dynamically
  const bookmarkedDocuments = useMemo(() => {
    return documents.filter((doc) => doc.isBookmarked)
  }, [documents])

  const stats = [
    {
      label: "Files Indexed",
      value: String(123 + documents.length),
      icon: Folder,
      iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
    },
    {
      label: "Categories",
      value: "15",
      icon: BookOpen,
      iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
    },
    {
      label: "Total Size",
      value: "742 MB",
      icon: Database,
      iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
    },
    {
      label: "AI Summaries",
      value: "36",
      icon: Sparkles,
      iconBg: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900",
    },
    {
      label: "Indexing Accuracy",
      value: "98%",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900",
    },
  ]

  // Multi-dimensional combined search, filter, and sort logic
  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        // 1. Search Query Filter (Matches Document Name, Subject, or Category)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchesTitle = doc.title.toLowerCase().includes(q)
          const matchesSubject =
            (doc.subject || "").toLowerCase().includes(q) ||
            (doc.fullSubject || "").toLowerCase().includes(q)
          const matchesCategory = (doc.category || "").toLowerCase().includes(q)

          if (!matchesTitle && !matchesSubject && !matchesCategory) return false
        }

        // 2. Category Chip Filter
        if (selectedCategory !== "All") {
          const catLower = selectedCategory.toLowerCase()
          const docCatLower = (doc.category || "").toLowerCase()
          const matchesCategory =
            docCatLower === catLower ||
            docCatLower.includes(catLower) ||
            catLower.includes(docCatLower)
          if (!matchesCategory) return false
        }

        // 3. Subject Filter (Dropdown)
        if (selectedSubject !== "All" && selectedSubject !== "All Subjects") {
          const subLower = selectedSubject.toLowerCase()
          const matchesSubject =
            (doc.subject || "").toLowerCase() === subLower ||
            (doc.fullSubject || "").toLowerCase() === subLower ||
            doc.title.toLowerCase().includes(subLower)
          if (!matchesSubject) return false
        }

        // 4. File Type Filter (PDF, DOCX, PPTX)
        if (selectedType !== "All Types" && selectedType !== "All File Types") {
          const typeLower = selectedType.toLowerCase()
          const docTypeLower = (doc.fileType || "").toLowerCase()
          if (docTypeLower !== typeLower) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === "Most Recent") {
          return a.timestamp - b.timestamp
        }
        if (sortBy === "Oldest") {
          return b.timestamp - a.timestamp
        }
        if (sortBy === "A-Z") {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  }, [documents, searchQuery, selectedCategory, selectedSubject, selectedType, sortBy])

  // Is selected category one of the "More" categories?
  const isMoreCategorySelected = moreCategories.includes(selectedCategory)

  // Functional AI Tools list
  const targetDoc = filteredDocuments[0] || documents[0]

  const aiTools = [
    {
      title: "Ask AI from Document",
      desc: "Get answers from your documents",
      icon: MessageSquare,
      iconBg: "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400",
      action: () => setAskAIModalDoc(targetDoc),
    },
    {
      title: "Generate Summary",
      desc: "Get AI summary of any document",
      icon: FileText,
      iconBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
      action: () => setPreviewModalDoc(targetDoc),
    },
    {
      title: "Generate Quiz",
      desc: "Create quizzes from your notes",
      icon: HelpCircle,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
      action: () => setQuizModalDoc(targetDoc),
    },
    {
      title: "Extract Key Points",
      desc: "Extract important concepts",
      icon: ListChecks,
      iconBg: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
      action: () => setKeyPointsModalDoc(targetDoc),
    },
  ]

  // Dynamic Recently Viewed state (Top 3 most recent)
  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      id: 3,
      title: "Data Structures and Algorithms Book",
      fileType: "PDF",
      viewedTime: "Viewed 1 hour ago",
      iconBg: "bg-red-500/10 text-red-500",
    },
    {
      id: 2,
      title: "Database Management Systems Notes",
      fileType: "DOCX",
      viewedTime: "Viewed yesterday",
      iconBg: "bg-blue-500/10 text-blue-500",
    },
    {
      id: 13,
      title: "Machine Learning Fundamentals Slides",
      fileType: "PPTX",
      viewedTime: "Viewed 2 days ago",
      iconBg: "bg-amber-500/10 text-amber-500",
    },
  ])

  // Open Document Preview and automatically update Recently Viewed panel
  const handleOpenDocument = (doc) => {
    if (!doc) return
    setPreviewModalDoc(doc)

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== doc.id)
      const newItem = {
        id: doc.id,
        title: doc.title,
        fileType: doc.fileType,
        viewedTime: "Viewed just now",
        iconBg: doc.iconBg || "bg-blue-500/10 text-blue-500",
        docRef: doc,
      }
      return [newItem, ...filtered].slice(0, 3)
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload File Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      {/* Action Modals */}
      <DocumentPreviewModal
        isOpen={!!previewModalDoc}
        onClose={() => setPreviewModalDoc(null)}
        doc={previewModalDoc}
      />

      <AskAIModal
        isOpen={!!askAIModalDoc}
        onClose={() => setAskAIModalDoc(null)}
        doc={askAIModalDoc}
      />

      <GenerateQuizModal
        isOpen={!!quizModalDoc}
        onClose={() => setQuizModalDoc(null)}
        doc={quizModalDoc}
      />

      <KeyPointsModal
        isOpen={!!keyPointsModalDoc}
        onClose={() => setKeyPointsModalDoc(null)}
        doc={keyPointsModalDoc}
      />

      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-display">
              Academic Knowledge Base
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Indexed course notes, textbooks, and past papers
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 font-medium shadow-sm px-4 py-2 text-sm shrink-0 cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      {/* 2. Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((stat, i) => {
          const IconComponent = stat.icon
          return (
            <Card key={i} className="p-4 border-border/60 bg-card rounded-2xl shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${stat.iconBg}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground font-display leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, books, papers..."
            className="pl-10 pr-9 h-10 rounded-xl border-border/70 bg-card text-xs md:text-sm shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-10 rounded-xl border border-border/70 bg-card px-3 text-xs md:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All Types">All File Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="PPTX">PPTX</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-10 rounded-xl border border-border/70 bg-card px-3 text-xs md:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All">All Subjects</option>
            <option value="Data Structures & Algorithms">DSA</option>
            <option value="Database Management Systems">DBMS</option>
            <option value="Operating Systems">OS</option>
            <option value="Computer Networks">CN</option>
            <option value="Machine Learning">ML</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-xl border border-border/70 bg-card px-3 text-xs md:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Oldest">Oldest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>

      {/* 4. 15 Document Categories System */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none text-xs">
        {initialCategories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 shrink-0 transition-all font-medium cursor-pointer ${
                isActive
                  ? "border border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                  : "border border-border/70 bg-card hover:bg-muted text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          )
        })}

        {/* More ▾ Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`rounded-xl border px-3.5 py-1.5 shrink-0 flex items-center gap-1.5 transition-all font-medium cursor-pointer ${
              isMoreCategorySelected
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                : "border border-border/70 bg-card hover:bg-muted text-muted-foreground"
            }`}
          >
            <span>{isMoreCategorySelected ? selectedCategory : "More"}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52 rounded-xl p-1.5 shadow-lg border-border/80 bg-card">
            {moreCategories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="flex items-center justify-between text-xs rounded-lg font-medium cursor-pointer py-2 px-2.5"
                >
                  <span>{cat}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Grid: Left Documents Area (8 cols) + Right Panels (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 5. Recent Documents Section */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-foreground font-display">
              Recent Documents ({filteredDocuments.length})
            </h2>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedSubject("All")
                setSelectedType("All Types")
                setSortBy("Most Recent")
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          <div className="space-y-3">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  {...doc}
                  onToggleBookmark={handleToggleBookmark}
                  onOpen={() => handleOpenDocument(doc)}
                  onAskAI={() => setAskAIModalDoc(doc)}
                  onGenerateQuiz={() => setQuizModalDoc(doc)}
                  onDownload={() => handleDownload(doc)}
                  onRename={handleRenameDocument}
                  onMoveCategory={handleMoveCategory}
                  onDelete={handleDeleteDocument}
                />
              ))
            ) : (
              <Card className="p-8 text-center border-border/60 bg-card rounded-2xl space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto text-muted-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-base">No documents found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  No documents matched your combined filter criteria. Try resetting search, category, or file format filters.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSelectedSubject("All")
                    setSelectedType("All Types")
                    setSortBy("Most Recent")
                  }}
                  className="rounded-xl text-xs font-medium border-border/80 cursor-pointer"
                >
                  Reset All Filters
                </Button>
              </Card>
            )}
          </div>

          {filteredDocuments.length > 0 && (
            <div className="pt-2 text-center">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                View All Documents <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar Panels */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Tools Panel */}
          <Card className="p-4 border-border/60 bg-card rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm font-display">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>AI Tools</span>
            </div>
            <div className="space-y-2">
              {aiTools.map((tool, i) => {
                const ToolIcon = tool.icon
                return (
                  <div
                    key={i}
                    onClick={tool.action}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tool.iconBg}`}
                      >
                        <ToolIcon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground shrink-0" />
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recently Viewed Panel */}
          <Card className="p-4 border-border/60 bg-card rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm font-display">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Recently Viewed</span>
              </div>
              <button
                onClick={() => alert("Showing all recently viewed documents...")}
                className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentlyViewed.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const target = item.docRef || documents.find((d) => d.id === item.id) || documents[0]
                    handleOpenDocument(target)
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg || "bg-blue-500/10 text-blue-500"}`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <span>{item.fileType || "PDF"}</span>
                        <span>•</span>
                        <span>{item.viewedTime}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          {/* Dynamic Bookmarked Panel */}
          <Card className="p-4 border-border/60 bg-card rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm font-display">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>Bookmarked ({bookmarkedDocuments.length})</span>
              </div>
              {bookmarkedDocuments.length > 0 && (
                <button className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">
                  View All
                </button>
              )}
            </div>
            <div className="space-y-2">
              {bookmarkedDocuments.length > 0 ? (
                bookmarkedDocuments.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPreviewModalDoc(item)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                      >
                        <FileText className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleBookmark(item.id)
                        }}
                        className="p-1 text-amber-400 hover:text-muted-foreground/60 transition-colors cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                      </button>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground shrink-0" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-3 border border-dashed border-border/60 rounded-xl">
                  No bookmarked documents yet. Star a document to save it here.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Download Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 border border-slate-700/80">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
