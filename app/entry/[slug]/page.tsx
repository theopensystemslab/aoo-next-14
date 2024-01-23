import { O } from "@/app/utils/fp"
import {
  getEntry,
  getPatternClasses,
  getPatterns,
} from "@/app/utils/sanity/queries"
import { pipe } from "fp-ts/lib/function"
import { Metadata, ResolvingMetadata } from "next"
import EntryClientComponent from "./EntryClientComponent"

type Props = {
  params: { slug: string }
}

const EntryServerComponent = async ({ params: { slug } }: Props) => {
  const entry = await getEntry(slug)
  const patterns = await getPatterns()
  const patternClasses = await getPatternClasses()

  const OnNull = () => null

  return pipe(
    entry,
    O.fromNullable,
    O.match(
      () => <OnNull />,
      (entry) => (
        <EntryClientComponent
          entry={entry}
          patterns={patterns}
          patternClasses={patternClasses}
        />
      )
    )
  )
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const entry = await getEntry(slug)

  const { name: title, mainImage } = entry

  return {
    title,
    openGraph: {
      images: [
        {
          url: mainImage?.file?.asset?.url ?? "",
          alt: title,
        },
      ],
    },
  }
}

export default EntryServerComponent
