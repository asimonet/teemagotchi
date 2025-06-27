import Image from 'next/image'
import { FC } from 'react'

interface CarouselThumbnailsProps {
  images: Array<{
    src: string
    alt?: string
    bgcolor: string
  }>
}

export const CarouselThumbnails: FC<CarouselThumbnailsProps> = ({ images }) => {
  return (
    <div className="w-full mx-auto overflow-x-auto">
      <div className="flex space-x-3 pl-2">
        {images.map(({ src, alt, bgcolor }, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden
              ${bgcolor} shadow-[0px_4px_4px_0px_rgba(112,0,255,0.1)]`}
          >
            <Image
              src={src}
              alt={alt ?? `Thumbnail ${index + 1}`}
              width={96}
              height={96}
              className="relative left-[-20px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
