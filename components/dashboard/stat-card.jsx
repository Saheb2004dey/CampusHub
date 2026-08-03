import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent = "primary",
}) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            accent === "primary" ? "bg-primary/10 text-primary" : "bg-accent/15 text-accent",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-display text-3xl font-semibold tracking-tight">{value}</span>
        {trend && <span className="mb-1 text-xs font-medium text-accent">{trend}</span>}
      </div>
    </Card>
  )
}
