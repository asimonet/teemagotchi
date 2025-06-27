import React from 'react'

interface InfoCardProps {
  /** The big header text (e.g. “Joie”, “Procrastination”) */
  title: string
  /** Tailwind bg-color for the top section (e.g. "bg-purple-300", "bg-yellow-300") */
  headerBg: string
  /** The body JSX */
  children: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, headerBg, children }) => {
  return (
    <div className="w-30 rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Top coloured header: fixed height, hides overflow */}
      <div className={`${headerBg} h-14 overflow-hidden relative`}>
        {/* Title: absolutely bottom-aligned so only its lower half peeks into view */}
        <h3 className="absolute bottom-0 w-[80%] right-0 bottom-1 text-3xl font-bold text-brand-60
            text-right text-[clamp(10px,30px,36px)] wrap-break-word
            leading-[90%]">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-2 text-[6px] text-gray-700">
        {children}
      </div>
    </div>
  )
}
