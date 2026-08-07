"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Star,
  Eye,
  Download,
  Sparkles,
  HelpCircle,
  MoreVertical,
  Pencil,
  FolderInput,
  Trash2,
} from "lucide-react"

export function DocumentCard({
  id,
  title,
  category,
  subject,
  fileType = "PDF",
  fileSize,
  pageCount,
  updatedDate,
  isBookmarked = false,
  summaryAvailable = false,
  onOpen,
  onDownload,
  onAskAI,
  onGenerateQuiz,
  onToggleBookmark,
  onRename,
  onMoveCategory,
  onDelete,
}) {
  // Determine icon & color container dynamically by file type
  const getFileIconConfig = () => {
    const typeUpper = (fileType || "PDF").toUpperCase()
    if (typeUpper.includes("DOC") || typeUpper.includes("NOTE")) {
      return {
        icon: FileSpreadsheet,
        bg: "bg-blue-500/10 text-blue-500 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900",
      }
    }
    if (typeUpper.includes("PPT") || typeUpper.includes("SLIDE")) {
      return {
        icon: Presentation,
        bg: "bg-amber-500/10 text-amber-500 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900",
      }
    }
    // Default PDF or Past Papers
    return {
      icon: FileText,
      bg: "bg-red-500/10 text-red-500 dark:bg-red-950/50 dark:text-red-400 border border-red-200/60 dark:border-red-900",
    }
  }

  const { icon: FileIcon, bg: iconBgClass } = getFileIconConfig()

  return (
    <Card className="p-4 sm:p-5 border-border/60 bg-card rounded-2xl shadow-xs hover:shadow-sm transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Info Column */}
        <div className="flex items-start gap-3.5 min-w-0">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBgClass}`}>
            <FileIcon className="h-6 w-6" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground text-sm sm:text-base tracking-tight truncate max-w-md">
                {title}
              </h3>
              <button
                type="button"
                onClick={() => onToggleBookmark?.(id)}
                className="focus:outline-none p-0.5 rounded hover:bg-muted/60 transition-colors cursor-pointer"
                title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
              >
                <Star
                  className={`h-4 w-4 transition-colors ${
                    isBookmarked
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/50 hover:text-amber-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs flex-wrap">
              {category && (
                <span className="rounded-md px-2 py-0.5 font-semibold text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900">
                  {category}
                </span>
              )}
              {subject && (
                <span className="rounded-md px-2 py-0.5 font-medium text-[11px] bg-muted/80 text-muted-foreground">
                  {subject}
                </span>
              )}
              {summaryAvailable && (
                <span className="rounded-md px-2 py-0.5 font-semibold text-[11px] bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Summary
                </span>
              )}
              <span className="text-muted-foreground">
                {fileType} • {fileSize} • {pageCount}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground/80">
              {updatedDate}
            </p>
          </div>
        </div>

        {/* Right Actions Block */}
        <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
          {/* 2x2 Grid for main action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpen?.(id)}
              className="rounded-xl bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200/80 dark:border-blue-900 text-xs font-semibold gap-1.5 h-8 sm:h-9 px-3 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" /> Open
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload?.(id)}
              className="rounded-xl border-blue-200/80 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold gap-1.5 h-8 sm:h-9 px-3 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAskAI?.(id)}
              className="rounded-xl bg-purple-50/50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-200/80 dark:border-purple-900 text-xs font-semibold gap-1.5 h-8 sm:h-9 px-3 hover:bg-purple-100/50 dark:hover:bg-purple-900/50 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onGenerateQuiz?.(id)}
              className="rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-900 text-xs font-semibold gap-1.5 h-8 sm:h-9 px-3 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50 cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" /> Generate Quiz
            </Button>
          </div>

          {/* Three-dot options DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="h-[72px] sm:h-[76px] w-9 rounded-xl border border-border/70 bg-card text-muted-foreground hover:text-foreground shrink-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-muted/50"
              title="More Options"
            >
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg border-border/80 bg-card">
              <DropdownMenuItem
                onClick={() => onRename?.(id)}
                className="text-xs rounded-lg font-medium gap-2.5 cursor-pointer py-2 px-2.5"
              >
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Rename</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onMoveCategory?.(id)}
                className="text-xs rounded-lg font-medium gap-2.5 cursor-pointer py-2 px-2.5"
              >
                <FolderInput className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Move to Category</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onToggleBookmark?.(id)}
                className="text-xs rounded-lg font-medium gap-2.5 cursor-pointer py-2 px-2.5"
              >
                <Star
                  className={`h-3.5 w-3.5 ${
                    isBookmarked ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                  }`}
                />
                <span>{isBookmarked ? "Remove Bookmark" : "Add Bookmark"}</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onOpen?.(id)}
                className="text-xs rounded-lg font-medium gap-2.5 cursor-pointer py-2 px-2.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span>Generate Summary</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 border-border/60" />

              <DropdownMenuItem
                onClick={() => onDelete?.(id)}
                className="text-xs rounded-lg font-medium gap-2.5 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer py-2 px-2.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
