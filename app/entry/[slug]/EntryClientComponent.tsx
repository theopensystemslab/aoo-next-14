"use client"
import { Carousel } from "@/app/ui/carousel/Carousel"
import Chart from "@/app/ui/chart/Chart"
import { getFormattedTenureTypes } from "@/app/utils/sanity/entry"
import { ArrowRight } from "@carbon/icons-react"
import React, { useState } from "react"
import EntryDetails from "./EntryDetails"
import EntryHeader from "./EntryHeader"
import { useWindowDimensions } from "@/app/utils/dom"
import {
  CarouselEntry,
  Entry,
  Pattern,
  PatternClass,
} from "@/app/utils/sanity/types"
import "client-only"

// "true" enables toggling between two chart styles
//    helpful for debugging math between pattern classes & individual terms!
const DEBUG_CHARTS = false
type Props = {
  entry?: Entry
  carouselEntries?: CarouselEntry[]
  patterns: Pattern[]
  patternClasses: PatternClass[]
}

const EntryClientComponent = (props: Props) => {
  const { entry, carouselEntries, patterns, patternClasses } = props
  const [showRollup, setShowRollup] = useState(false)

  const { width } = useWindowDimensions()

  return (
    <div className="text-white">
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      {entry?.terms?.length && (
        <Chart
          rollupToPatternClass={showRollup}
          showLabels={width && width > 450 ? true : false}
          terms={entry?.terms}
          entryId={entry?._id}
          patterns={patterns}
          patternClasses={patternClasses}
        />
      )}
      {DEBUG_CHARTS && (
        <form className="flex m-3 p-3 bg-gray-200">
          <div className="text-black text-sm mr-2">Chart by:</div>
          <div className="radio text-black text-sm mr-3">
            <label>
              <input
                type="radio"
                value="patternClass"
                checked={showRollup === true}
                onChange={() => setShowRollup(!showRollup)}
                className="mr-1 ml-1"
              />
              Pattern class
            </label>
          </div>
          <div className="radio text-black text-sm mr-3">
            <label>
              <input
                type="radio"
                value="term"
                checked={showRollup === false}
                onChange={() => setShowRollup(!showRollup)}
                className="mr-1 ml-1"
              />
              Terms
            </label>
          </div>
        </form>
      )}
      {entry?.tenureType && (
        <div className="m-4">
          {/* <Carousel
            data={carouselItems}
            title={`Other examples of ${getFormattedTenureTypes(
              entry?.tenureType
            )}`}
            cardClassNames="bg-gray-200"
          /> */}
        </div>
      )}
      <a
        className="w-full bg-black flex py-4 justify-center"
        href="https://airtable.com/shrl7X5UhiOHUaj3r"
        target="_blank"
        rel="noreferrer"
      >
        Suggest an improvement to this entry
        <ArrowRight className="pl-2" size={24} />
      </a>
    </div>
  )
}

export default EntryClientComponent
