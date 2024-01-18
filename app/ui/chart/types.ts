import { PatternClass } from "@/app/utils/sanity/types"

export interface PatternClassTotal {
  name: string | undefined
  meta: PatternClass | undefined
  avgObligations: number
  avgRights: number
}
