import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: any) => void
  options: Option[]
  placeholder?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className={`relative inline-block w-full md:w-44 text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 hover:bg-accent/20 transition-all select-none"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute z-[999] mt-1.5 max-h-60 w-full min-w-[8rem] overflow-y-auto rounded-md border border-border bg-card p-1 text-popover-foreground shadow-md animate-in fade-in slide-in-from-top-1 duration-100 dark:bg-[#18181b]">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground text-left text-foreground transition-colors disabled:pointer-events-none disabled:opacity-50 font-medium"
            >
              {opt.value === value && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Check className="h-4 w-4 text-brand" />
                </span>
              )}
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
