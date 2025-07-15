import { Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero"
import Header from "./components/Header"

function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </>
  )
}

export default App
