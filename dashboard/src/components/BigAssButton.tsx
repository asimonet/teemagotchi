// components/ButtonLink.tsx
import Link from 'next/link'
import React from 'react'

interface BigAssButtonProps {
  label: string
  href: string
  /** Optional extra classes */
  className?: string
}

export const BigAssButton: React.FC<ButtonLinkProps> = ({
  label,
  href,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`
        inline-block
        px-6 py-3
        bg-purple-300 text-white
        rounded-xl shadow-md
        hover:bg-purple-400 transition-colors
        ${className}
      `}
    >
      {label}
    </Link>
  )
}
