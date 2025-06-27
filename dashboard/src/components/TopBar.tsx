import Image from 'next/image'
import { useState } from 'react'
import { ToggleGroup } from './ToggleGroup'

export default function TopBar() {
  const [view, setView] = useState<'Mois'|'Jour'|'Semaine'>('Jour')

  return (
    <header className="w-full flex items-center justify-between">
      {/* Left: square thumbnail */}
      <div className="flex-shrink-0">
        <Image
          src="/avatar_0.png"
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Right: toggle buttons */}
      <ToggleGroup
        options={['Mois', 'Jour', 'Semaine']}
        value={view}
        onChange={setView}
      />
    </header>
  )
}
