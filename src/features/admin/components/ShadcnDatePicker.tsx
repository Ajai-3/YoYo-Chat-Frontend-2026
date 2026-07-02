import React, { useState, useRef, useEffect } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

interface ShadcnDatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const ShadcnDatePicker: React.FC<ShadcnDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick a date",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Current calendar view state
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value))
    }
  }, [value])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Months labels
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  // Day headers
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Calendar dates calculation
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleSelectDay = (day: number) => {
    // Format YYYY-MM-DD
    const mStr = String(month + 1).padStart(2, "0")
    const dStr = String(day).padStart(2, "0")
    const selectedDateStr = `${year}-${mStr}-${dStr}`
    onChange(selectedDateStr)
    setIsOpen(false)
  }

  // Generate blank grids and day grids
  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="h-8 w-8" />)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const mStr = String(month + 1).padStart(2, "0")
    const dStr = String(d).padStart(2, "0")
    const dateStr = `${year}-${mStr}-${dStr}`
    const isSelected = value === dateStr

    cells.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => handleSelectDay(d)}
        className={`h-8 w-8 rounded-md text-xs font-semibold flex items-center justify-center transition-all ${
          isSelected
            ? "bg-brand text-brand-foreground shadow-md font-bold"
            : "text-foreground hover:bg-accent/40 hover:text-foreground"
        }`}
      >
        {d}
      </button>
    )
  }

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      {/* Date Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-start gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-foreground hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all select-none"
      >
        <CalendarIcon className="h-4 w-4 opacity-50 shrink-0" />
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? value : placeholder}
        </span>
      </button>

      {/* Calendar Dropdown Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-64 rounded-md border border-border bg-card p-3 shadow-md animate-in fade-in slide-in-from-top-1 duration-100 dark:bg-[#18181b] left-0">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="h-7 w-7 flex items-center justify-center rounded-md border border-border hover:bg-accent text-foreground transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-foreground">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="h-7 w-7 flex items-center justify-center rounded-md border border-border hover:bg-accent text-foreground transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Week labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
            {dayLabels.map((lbl) => (
              <div key={lbl} className="h-8 flex items-center justify-center">
                {lbl}
              </div>
            ))}
          </div>

          {/* Day grids */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {cells}
          </div>
        </div>
      )}
    </div>
  )
}
