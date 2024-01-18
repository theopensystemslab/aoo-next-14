import _ from "lodash"
import { Pattern, PatternClass, Term } from "../../utils/sanity/types"
import BarChartByPatternClass from "./BarChartByPatternClass"
import ExpandableBarChartByPattern from "./ExpandableBarChartByPattern"

type Props = {
  rollupToPatternClass: boolean
  showLabels: boolean
  terms?: Term[]
  entryId?: string
  patterns: Pattern[]
  patternClasses: PatternClass[]
}

const Chart = (props: Props) => {
  const {
    rollupToPatternClass,
    showLabels,
    terms = [],
    entryId,
    patterns,
    patternClasses,
  } = props

  // const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  // const { data: patternClasses, error: patternClassesError } =
  //   trpc.patternClasses.useQuery()

  // Format the list of individual terms that apply to this entry
  let formattedTerms = _(terms)
    .map((term: any) => ({
      pattern: _.find(patterns, ["_id", term.pattern?._ref]),
      patternName: _.find(patterns, ["_id", term.pattern?._ref])?.name,
      type: _.capitalize(_.find(patterns, ["_id", term.pattern?._ref])?.type),
      strength: term.strength, // 1-5
      description: term.description,
      legalMechanisms: term.termLegalMechanisms?.map(
        (mechanism: Record<string, any>) => mechanism.name
      ),
    }))
    .map((term: any) => ({
      meta: term.pattern,
      name: term.patternName,
      patternClassName: _.find(patternClasses, [
        "_id",
        term.pattern?.class?._ref,
      ])?.name,
      patternClassOrder: _.find(patternClasses, [
        "_id",
        term.pattern?.class?._ref,
      ])?.order,
      patternIconUrl: term.pattern?.iconUrl,
      type: term.type === "Limitation" ? "Obligation" : term.type,
      strength: term.strength,
      description: term.description,
      legalMechanisms: term.legalMechanisms,
    }))
    .sortBy("patternClassOrder", "name")
    .value()

  // Rollup the individual terms by their pattern class
  let totalsByPatternClass = _(formattedTerms)
    .groupBy("patternClassName")
    .map((terms: any) => ({
      terms: terms,
      meta: _.find(patternClasses, ["_id", terms[0].meta?.class._ref]),
      name: terms[0].patternClassName,
      avgRights: _(terms).filter({ type: "Right" }).meanBy("strength"),
      avgObligations: _(terms)
        .filter({ type: "Obligation" })
        .meanBy("strength"),
    }))
    .sortBy("meta.order")
    .value()

  // Ensure totalsByPatternClass has an entry for **every** pattern class, insert one if it doesn't
  // if (totalsByPatternClass.length !== patternClasses?.length) {
  //   patternClasses?.forEach(globalPatternClass => {
  //     if (!_.find(totalsByPatternClass, ['name', globalPatternClass.name])) {
  //       totalsByPatternClass.push({
  //         terms: [],
  //         meta: globalPatternClass,
  //         name: globalPatternClass.name,
  //         avgRights: 0,
  //         avgObligations: 0,
  //       });
  //     }
  //   });
  // }

  // Replace any NaNs with 0, round to nearest integer, and do a final sort
  totalsByPatternClass = _(totalsByPatternClass)
    .map((patternClass: any) => ({
      terms: patternClass.terms,
      meta: patternClass.meta,
      name: patternClass.name,
      avgRights:
        patternClass.avgRights > 0 ? _.round(patternClass.avgRights) : 0,
      avgObligations:
        patternClass.avgObligations > 0
          ? _.round(patternClass.avgObligations)
          : 0,
    }))
    .sortBy("meta.order")
    .value()

  return rollupToPatternClass ? (
    <BarChartByPatternClass
      data={totalsByPatternClass}
      showLabels={showLabels}
    />
  ) : (
    <ExpandableBarChartByPattern
      data={formattedTerms}
      entryId={entryId}
      showLabels={showLabels}
    />
  )
}

export default Chart
