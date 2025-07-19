import { Route, Routes } from "react-router-dom"
import Hero from "./pages/LandingPage/Hero"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Dashboard from "./pages/dashboard/Dashboard"


function App() {

  return (
    <>



      <Routes>
        <Route path="/" element={<Hero />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>


    </>
  )
}

export default App
