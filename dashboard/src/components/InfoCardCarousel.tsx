import React from 'react'
import { InfoCard } from './InfoCard'

interface CardData {
  title: string
  headerBg: string
  content: React.ReactNode
}

interface InfoCardCarouselProps {
  cards: CardData[]
}

export const InfoCardCarousel: React.FC<InfoCardCarouselProps> = ({ cards }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex space-x-4 px-4">
        {cards.map((card, idx) => (
          <div key={idx} className="flex-shrink-0 snap-start">
            <InfoCard title={card.title} headerBg={card.headerBg}>
              {card.content}
            </InfoCard>
          </div>
        ))}
      </div>
    </div>
  )
}
