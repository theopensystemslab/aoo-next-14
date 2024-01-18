// import { useRouter } from "next/router"
import "./globals.css"
import MapboxGlobeServerSide from "./ui/map/MapboxGlobeServerSide"
// import Footer from "../Footer"
// import Header from "../Header"
// import Sidebar from "../sidebar/Sidebar"

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
        {/* <Sidebar /> */}
        {/* <motion.div
      className="h-full w-full sm:w-1/2 absolute top-0 bottom-0 right-0 bg-white overflow-y-auto no-scrollbar z-50"
      variants={{
        open: {
          x: "0%",
        },
        closed: {
          x: "100%",
        },
      }}
      // animate={entryOpen ? "open" : "closed"}
      initial="closed"
      transition={{
        duration: 1,
      }}
    > */}
        {children}
        {/* </motion.div> */}
        <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
          {/* <Header /> */}
          <div className="w-full h-screen max-h-[85vh] relative">
            <MapboxGlobeServerSide />
            {/* <MapboxGlobe {...{ entries }} /> */}
            {/* <SubmitButton /> */}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </body>
  </html>
)

export default RootLayout
