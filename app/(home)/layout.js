import Topbar from "@/components/layout/Topbar"

function HomeLayout({children}) {
  return (
    <>
        <Topbar/>
        {children}
    </>
  )
}

export default HomeLayout
