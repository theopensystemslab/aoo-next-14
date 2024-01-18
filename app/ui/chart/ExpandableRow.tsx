import { CarouselItem } from "@/app/utils/sanity/types"
import {
  backgroundColorClasses,
  descriptionBackgroundColorClasses,
} from "./styles"
import { ChevronUp } from "@carbon/icons-react"
import clsx from "clsx"
import { PatternIcon } from "../PatternIcon"
import { Tag } from "../Tag"
import { Carousel } from "../carousel/Carousel"

interface Props {
  carouselItems: CarouselItem[]
  term?: any
  entryId?: string
  onClick: () => void
}

const ExpandableRow = (props: Props) => {
  const { term, onClick, entryId, carouselItems } = props

  // const { data: carouselItems, error: carouselItemsError } =
  //   trpc.entriesByPatternId.useQuery({ patternId: term.meta._id, entryId })

  const showCarousel = carouselItems && carouselItems.length > 0

  return (
    <div
      className={`flex flex-col h-fit w-full text-black ${
        term.patternClassName
          ? descriptionBackgroundColorClasses[term.patternClassName]
          : "bg-gray-200"
      } cursor-pointer`}
      id="row-expandable-description"
      onClick={onClick}
    >
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-4">
          <PatternIcon
            className="mt-4"
            size="32"
            pattern={{ iconUrl: term.patternIconUrl }}
          />
          <div className="flex justify-between items-center">
            <ChevronUp
              size={32}
              className={`${
                backgroundColorClasses[term.patternClassName]
              } bg-opacity-20 h-10 w-10 p-2`}
            />
            <p className="text-xs sm:text-sm text-right pl-4">
              {term.patternClassName} {term.type.toLowerCase()}
            </p>
          </div>
        </div>
        <h2 className="text-base sm:text-lg">{term.name}</h2>
        <p className="text-xs sm:text-sm mb-2 sm:mb-4">
          {term.meta?.description}
        </p>
        {term?.description && (
          <div>
            <h3>How it applies here</h3>
            <p className="text-xs sm:text-sm">{term?.description}</p>
          </div>
        )}
        {term?.legalMechanisms && (
          <div className="mt-4 flex gap-4">
            {term.legalMechanisms.map((mechanism: string) => (
              <Tag
                key={mechanism}
                className={`${
                  backgroundColorClasses[term.patternClassName]
                } bg-opacity-20`}
              >
                {mechanism}
              </Tag>
            ))}
          </div>
        )}
      </div>
      {showCarousel && (
        <Carousel
          data={carouselItems}
          title="Other places that use this pattern"
          cardClassNames={clsx(
            `${backgroundColorClasses[term.patternClassName]} bg-opacity-20`
          )}
        />
      )}
    </div>
  )
}

export default ExpandableRow
