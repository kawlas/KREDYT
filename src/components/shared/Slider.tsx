

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  unit?: string
  helperText?: string
  className?: string
  minLabel?: string
  maxLabel?: string
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit = '',
  helperText,
  className = '',
  minLabel,
  maxLabel
}: SliderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
          {value}{unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel || `${min}${unit}`}</span>
        <span>{maxLabel || `${max}${unit}`}</span>
      </div>

      {helperText && (
        <p className="text-xs text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  )
}
