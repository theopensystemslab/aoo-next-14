import "server-only"
import React from "react"
import MapboxGlobe from "./MapboxGlobe"
import {
  getEntries,
  getPatternClasses,
  getPatterns,
} from "@/app/utils/sanity/queries"

const MapboxGlobeServerSide = async () => {
  const entries = await getEntries()
  const patterns = await getPatterns()
  const patternClasses = await getPatternClasses()

  return <MapboxGlobe {...{ entries, patternClasses, patterns }} />
}

export default MapboxGlobeServerSide
