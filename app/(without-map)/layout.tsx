import { Inter } from "next/font/google"
import { PropsWithChildren } from "react"
import { PageNavbar } from "../ui/PageNavbar"
import Footer from "../ui/footer/Footer"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

type Props = PropsWithChildren<{}>

const NoMapLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="bg-black z-20 text-white max-w-full fixed inset-0 overflow-y-auto overflow-x-auto">
          <PageNavbar />
          <div className="m-4 sm:m-8 sm:mr-0">{children}</div>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  )
}

export default NoMapLayout
