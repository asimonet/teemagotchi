import React from 'react'

type ToggleGroupProps<Label extends string> = {
  options: Label[]
  value: Label
  onChange: (newValue: Label) => void
}

export function ToggleGroup<Label extends string>({
  options,
  value,
  onChange,
}: ToggleGroupProps<Label>) {
  return (
    <div className="inline-flex gap-2">
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`
              px-3 py-1 text-[10px] font-semibold rounded-xl
              text-accent-30             /* #FCF9FF */
              leading-[12px]             /* 12px line-height */
              text-center                /* center align */
              decoration-solid           /* text-decoration-style */
              decoration-skip-ink-none   /* skip-ink: none */
              decoration-[6%]            /* thickness 6% of font-size (0.6px) */
              underline-offset-[1.45px]  /* offset 14.5% (1.45px) */
              ${
                active
                  ? 'bg-accent-30 text-white underline'
                  : 'bg-white text-accent hover:bg-accent-10'
              }
            `}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
