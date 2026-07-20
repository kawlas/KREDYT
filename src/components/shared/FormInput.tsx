import React from 'react'

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  unit?: string
  hint?: string
  error?: string
  inputClassName?: string
}

export default function FormInput({ label, unit, hint, error, inputClassName, ...inputProps }: FormInputProps) {
  const id = inputProps.id || inputProps.name || label.toLowerCase().replace(/\s+/g, '-')
  const isNumber = inputProps.type === 'number'

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...inputProps}
          inputMode={isNumber ? 'decimal' : inputProps.inputMode}
          className={`w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-ring/20 focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
          } ${unit ? 'pr-12' : ''} ${inputClassName || ''}`}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
            {unit}
          </span>
        )}
      </div>
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
