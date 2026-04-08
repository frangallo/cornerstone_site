import * as React from "react"
import { cn } from "@repo/design-system/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: React.ReactNode
  description?: string
  className?: string
  variant?: "default" | "carbon"
}

function SectionHeader({
  label,
  title,
  description,
  className,
  variant = "default",
}: SectionHeaderProps) {
  const labelClasses = {
    default: "text-amber",
    carbon: "text-amber",
  }

  const titleClasses = {
    default: "text-carbon",
    carbon: "text-white",
  }

  const descriptionClasses = {
    default: "text-warm-gray",
    carbon: "text-white/80",
  }

  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl", className)}>
      {label && (
        <div
          className={cn(
            "text-xs font-semibold tracking-widest uppercase",
            labelClasses[variant]
          )}
        >
          {label}
        </div>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-serif leading-tight",
          titleClasses[variant]
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg md:text-xl font-body leading-relaxed",
            descriptionClasses[variant]
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export { SectionHeader }
export type { SectionHeaderProps }
