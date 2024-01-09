import React from "react"
import { client } from "./utils/sanity/client"
import { entriesQuery } from "./utils/sanity/queries"
import { Entry } from "./utils/sanity/types"

const AppIndexPage = async () => {
  const posts = await client.fetch<Entry[]>(entriesQuery)

  return <div>{JSON.stringify(posts, null, 2)}</div>
}

export default AppIndexPage
