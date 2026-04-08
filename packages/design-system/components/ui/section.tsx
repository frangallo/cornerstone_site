import * as React from "react"
import { cn } from "@repo/design-system/lib/utils"

interface SectionProps extends React.ComponentProps<"section"> {
  number?: string
  variant?: "cream" | "stone" | "carbon"
}

function Section({
  className,
  number,
  variant = "cream",
  children,
  ...props
}: SectionProps) {
  const backgroundClasses = {
    cream: "bg-cream",
    stone: "bg-stone",
    carbon: "bg-carbon text-white",
  }

  return (
    <section
      className={cn(
        "relative py-8 md:py-10 lg:py-12 overflow-hidden",
        backgroundClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section }
export type { SectionProps }
