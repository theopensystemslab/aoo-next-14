// import { useRouter } from "next/router"
import "./globals.css"
import BetaBanner from "./ui/BetaBanner"
import EntryPopout from "./ui/EntryPopout"
import Footer from "./ui/footer/Footer"
import Header from "./ui/header/Header"
import MapboxGlobeServerSide from "./ui/map/MapboxGlobeServerSide"
import Sidebar from "./ui/sidebar/Sidebar"
// import Footer from "../Footer"
// import Header from "../Header"
// import Sidebar from "../sidebar/Sidebar"

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
        <Sidebar />
        <EntryPopout>{children}</EntryPopout>
        <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
          <BetaBanner />
          <Header />
          <div className="w-full h-screen max-h-[85vh] relative">
            <MapboxGlobeServerSide />
            {/* <MapboxGlobe {...{ entries }} /> */}
            {/* <SubmitButton /> */}
          </div>
          <Footer />
        </div>
      </div>
    </body>
  </html>
)

export default RootLayout
