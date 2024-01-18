"use client"
import "client-only"
import { Entry, Pattern, PatternClass } from "@/app/utils/sanity/types"
import store from "@/app/utils/store"
import Link from "next/link"
// import Chart from "../Chart"
import { getFormattedTenureTypes } from "@/app/utils/sanity/entry"
import { ArrowRight } from "@carbon/icons-react"
import { useState } from "react"
import { Marker as MapboxMarker, Popup } from "react-map-gl"
import Chart from "../../chart/Chart"
// import { useGetEntryFromSlug } from "@/lib/queries"
// import _ from "lodash"
// import { getFormattedTenureTypes } from "@/lib/entry"

type Props = {
  // slug: string
  entry: Entry
  patterns: Pattern[]
  patternClasses: PatternClass[]
  lat: number
  lng: number
}

const Marker = (props: Props) => {
  const { lat, lng, entry, patterns, patternClasses } = props

  const slug = entry.slug?.current ?? ""

  const [showPopup, setShowPopup] = useState<boolean>(false)

  const PopupContent = () => (
    <div className="w-[320px] sm:w-[500px]">
      <h2 className="text-lg sm:text-xl">{entry?.name}</h2>
      <span className="text-base">
        {getFormattedTenureTypes(entry?.tenureType)}
      </span>
      {entry.terms?.length && (
        <Chart
          rollupToPatternClass={true}
          showLabels={true}
          terms={entry?.terms}
          patterns={patterns}
          patternClasses={patternClasses}
        />
      )}
      <Link
        href={`/entry/${encodeURIComponent(slug)}`}
        className="flex justify-end items-center"
        legacyBehavior
      >
        <a>
          <div
            className="flex justify-end text-sm mt-3"
            onClick={() => setShowPopup(false)}
          >
            Find out more
            <ArrowRight className="ml-2" size={20} />
          </div>
        </a>
      </Link>
    </div>
  )

  return (
    <>
      <MapboxMarker
        key={slug}
        longitude={lng}
        latitude={lat}
        onClick={(e) => {
          store.map?.flyTo({
            center: { lat, lng },
            padding: { top: 500, bottom: 0, left: 0, right: 0 },
            zoom: 18,
          })
          e.originalEvent.stopPropagation()
          setShowPopup(!showPopup)
        }}
      >
        <div className="bg-white text-black rounded-full h-7 w-7 flex justify-center items-center">
          1
        </div>
      </MapboxMarker>
      {showPopup && (
        <Popup
          className="z-50 font-sans"
          longitude={lng}
          latitude={lat}
          maxWidth="none"
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <PopupContent />
        </Popup>
      )}
    </>
  )
}

export default Marker
