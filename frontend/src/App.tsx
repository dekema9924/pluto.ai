import { Route, Routes } from "react-router-dom"
import Hero from "./pages/LandingPage/Hero"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
