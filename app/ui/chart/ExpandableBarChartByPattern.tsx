import ExpandableRow from "./ExpandableRow"
import { useState } from "react"
import { PatternIcon } from "../PatternIcon"
import { backgroundColorClasses, hoverColorClasses } from "./styles"
import { CarouselEntry } from "@/app/utils/sanity/types"

interface ExpandableBarChartByPatternProps {
  data: any
  entryId: string | undefined
  showLabels: boolean
}

const ExpandableBarChartByPattern = (
  props: ExpandableBarChartByPatternProps
) => {
  const { data: formattedTerms, entryId, showLabels } = props
  const gridCols = showLabels ? 8 : 5

  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined)

  const handleClick = (i: number) => {
    i === openIndex ? setOpenIndex(undefined) : setOpenIndex(i)
  }

  // TODO
  const carouselEntries: CarouselEntry[] = []

  return (
    <div className="m-8">
      <div className="flex">
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">
          Obligations
        </div>
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">
          Rights
        </div>
      </div>
      {formattedTerms.map((term: any, i: number) => (
        <div className="flex flex-col" key={`row-${term.name}-${i}`}>
          <div className="flex">
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                direction: "rtl",
              }}
            >
              <div
                className={`${
                  term.type === "Obligation" &&
                  term.strength > 0 &&
                  backgroundColorClasses[term.patternClassName!]
                } ${
                  term.type === "Obligation" &&
                  hoverColorClasses[term.patternClassName!]
                } h-10 cursor-pointer flex justify-end items-center`}
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Obligation" && (
                  <PatternIcon
                    size="24"
                    className="ml-2 text-black"
                    pattern={{ iconUrl: term.patternIconUrl }}
                  />
                )}
              </div>
              {showLabels && (
                <div
                  className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center mr-3 text-right"
                  style={{
                    gridColumn: showLabels
                      ? `span ${term.strength ? 8 - term.strength : 7}`
                      : `span ${term.strength ? 5 - term.strength : 4}`,
                  }}
                >
                  {term.type === "Obligation" && term.name}
                </div>
              )}
            </div>
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                direction: "ltr",
              }}
            >
              <div
                className={`${
                  term.type === "Right" &&
                  term.strength > 0 &&
                  backgroundColorClasses[term.patternClassName!]
                } ${
                  term.type === "Right" &&
                  hoverColorClasses[term.patternClassName!]
                } h-10 cursor-pointer flex justify-end items-center`}
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Right" && (
                  <PatternIcon
                    size="24"
                    className="mr-2 text-black"
                    pattern={{ iconUrl: term.patternIconUrl }}
                  />
                )}
              </div>
              {showLabels && (
                <div
                  className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center justify-start ml-3"
                  style={{
                    gridColumn: showLabels
                      ? `span ${term.strength ? 8 - term.strength : 7}`
                      : `span ${term.strength ? 5 - term.strength : 4}`,
                  }}
                >
                  {term.type === "Right" && term.name}
                </div>
              )}
            </div>
          </div>
          {openIndex === i && (
            <ExpandableRow
              term={term}
              onClick={() => setOpenIndex(undefined)}
              entryId={entryId}
              carouselEntries={carouselEntries}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ExpandableBarChartByPattern
