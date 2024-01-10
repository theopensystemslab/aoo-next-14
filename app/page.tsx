import Link from "next/link"
import { getEntries } from "./utils/sanity/queries"
import { Fragment } from "react"

const AppIndexPage = async () => {
  const entries = await getEntries()

  return (
    <Fragment>
      <div>{JSON.stringify(entries, null, 2)}</div>
      <div className="absolute bottom-0 right-0 z-50 bg-red-500">
        <Link href={`./entry/new-communities`}>CLICK ME</Link>
      </div>
    </Fragment>
  )
}

export default AppIndexPage
