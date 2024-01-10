import Link from "next/link"
import { Fragment } from "react"

const AppIndexPage = async () => {
  return (
    <Fragment>
      <div className="absolute bottom-0 right-0 z-50 bg-red-500">
        <Link href={`./entry/new-communities`}>CLICK ME</Link>
      </div>
    </Fragment>
  )
}

export default AppIndexPage
