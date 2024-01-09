import React from "react"

const EntryPage = ({ params: { slug } }: { params: { slug: string } }) => {
  return <div>{JSON.stringify(slug)}</div>
}

export default EntryPage
