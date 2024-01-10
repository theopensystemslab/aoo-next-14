import { O } from "@/app/utils/fp"
import { getEntry } from "@/app/utils/sanity/queries"
import { Entry } from "@/app/utils/sanity/types"
import { pipe } from "fp-ts/lib/function"
import { Metadata, ResolvingMetadata } from "next"

const OnNull = () => null

const EntryComponent = ({ entry }: { entry: Entry }) => {
  return <div>{JSON.stringify(entry, null, 2)}</div>
}

type Props = {
  params: { slug: string }
}

const EntryPage = async ({ params: { slug } }: Props) => {
  const entry = await getEntry(slug)

  return pipe(
    entry,
    O.fromNullable,
    O.match(
      () => <OnNull />,
      (entry) => <EntryComponent entry={entry} />
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

  console.log(entry)

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

export default EntryPage
