"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"

export function UploadModal({ isOpen, onClose, onUploadComplete }) {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [category, setCategory] = useState("Course Notes")
  const [subject, setSubject] = useState("DSA")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  if (!isOpen) return null

  const allowedExtensions = ["pdf", "docx", "pptx"]

  const categoriesList = [
    "Course Notes",
    "Textbooks",
    "Previous Papers",
    "Question Banks",
    "Assignments",
    "Lab Manuals",
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!ext || !allowedExtensions.includes(ext)) {
      setErrorMessage("Unsupported file format. Please upload a PDF, DOCX, or PPTX file.")
      setSelectedFile(null)
      return
    }

    setErrorMessage("")
    setSelectedFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!ext || !allowedExtensions.includes(ext)) {
      setErrorMessage("Unsupported file format. Please upload a PDF, DOCX, or PPTX file.")
      setSelectedFile(null)
      return
    }

    setErrorMessage("")
    setSelectedFile(file)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB"
    }
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const startUpload = () => {
    if (!selectedFile) return

    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setIsSuccess(true)

          const ext = selectedFile.name.split(".").pop()?.toUpperCase() || "PDF"
          const title = selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) || selectedFile.name

          const subjectMap = {
            DSA: { code: "DSA", name: "Data Structures & Algorithms", bg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" },
            DBMS: { code: "DBMS", name: "Database Management Systems", bg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" },
            OS: { code: "OS", name: "Operating Systems", bg: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400" },
            CN: { code: "CN", name: "Computer Networks", bg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" },
            ML: { code: "ML", name: "Machine Learning", bg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400" },
            Programming: { code: "Programming", name: "Object Oriented Programming", bg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" },
            General: { code: "General", name: "Computer Science & Engineering", bg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" },
          }

          const chosenSubject = subjectMap[subject] || subjectMap.DSA

          const newDocument = {
            id: Date.now(),
            title: title,
            category: category,
            subject: chosenSubject.code,
            fullSubject: chosenSubject.name,
            subjectBg: chosenSubject.bg,
            fileType: ext,
            fileSize: formatFileSize(selectedFile.size),
            pageCount: ext === "PPTX" ? "32 slides" : "24 pages",
            updatedDate: "Uploaded just now by Aarav Sharma",
            timestamp: 0,
            isBookmarked: false,
            summaryAvailable: true,
            iconBg: ext === "PDF" ? "bg-red-500/10 text-red-500" : ext === "DOCX" ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-500",
          }

          setTimeout(() => {
            onUploadComplete(newDocument)
            handleClose()
          }, 800)

          return 100
        }
        return prev + 25
      })
    }, 200)
  }

  const handleClose = () => {
    setSelectedFile(null)
    setCategory("Course Notes")
    setSubject("DSA")
    setUploading(false)
    setProgress(0)
    setIsSuccess(false)
    setErrorMessage("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <Card className="bg-card border-border/80 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-lg p-1 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-foreground font-display">Upload Document</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload PDF, DOCX, or PPTX course materials to index into Knowledge Base
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border/80 hover:border-blue-500/60 rounded-2xl p-8 text-center cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors space-y-3"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Click to browse or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOCX, and PPTX (up to 25MB)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              {!uploading && !isSuccess && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-muted-foreground hover:text-red-500 p-1 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {!uploading && !isSuccess && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Select Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 rounded-xl border border-border/70 bg-card px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Select Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-10 rounded-xl border border-border/70 bg-card px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="DSA">DSA</option>
                    <option value="DBMS">DBMS</option>
                    <option value="OS">OS</option>
                    <option value="CN">CN</option>
                    <option value="ML">ML</option>
                    <option value="Programming">Programming</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                    Uploading & Indexing...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Document indexed successfully! Adding to Knowledge Base...</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={handleClose} className="rounded-xl text-xs cursor-pointer">
            Cancel
          </Button>
          {selectedFile && !uploading && !isSuccess && (
            <Button
              size="sm"
              onClick={startUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Upload & Index
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
