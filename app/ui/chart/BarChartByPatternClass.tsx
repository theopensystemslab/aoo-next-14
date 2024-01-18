import DataRow from "./DataRow"
import { PatternClassTotal } from "./types"

interface Props {
  data: PatternClassTotal[]
  showLabels: boolean
}

const BarChartByPatternClass = (props: Props) => {
  const { data: totalsByPatternClass, showLabels } = props

  return (
    <div className="mt-4">
      <div className="flex">
        {showLabels ? <div className="w-1/5 h-10"></div> : ``}
        <div className="flex-1 h-10 text-base text-center text-gray-500">
          Obligations
        </div>
        <div className="flex-1 h-10 text-base text-center text-gray-500">
          Rights
        </div>
      </div>
      {totalsByPatternClass.map((patternClass) => (
        <DataRow
          patternClassTotal={patternClass}
          showLabels={showLabels}
          key={`data-row-${patternClass.name}`}
        />
      ))}
    </div>
  )
}

export default BarChartByPatternClass
