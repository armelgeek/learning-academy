import Topbar from "@/components/Topbar"

function HomeLayout({children}) {
  return (
    <>
        <Topbar/>
        {children}
    </>
  )
}

export default HomeLayout