import { Route, Routes } from "react-router-dom"
import Hero from "./pages/LandingPage/Hero"
import { ProtectedRoute } from "./components/ProtectedRoute"
import DashboardLayout from "./pages/dashboard/DashboardLayout"
import RemoveBackground from "./pages/AI/RemoveBackground"
import GenerateImages from "./pages/AI/GenerateImages"
import WriteArticle from './pages/AI/WriteArticle'
import ReviewResume from "./pages/AI/ReviewResume"
import Dashboard from "./pages/AI/Dashboard"
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Hero />} />

        {/* Protected routes wrapper */}
        <Route element={<ProtectedRoute />}>

          {/* Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="generate" element={<GenerateImages />} />
            <Route path="remove-bg" element={<RemoveBackground />} />
            <Route path="write" element={<WriteArticle />} />
            <Route path="resume" element={<ReviewResume />} />
          </Route>



          {/* // Profile Page routes */}


        </Route>
      </Routes>



    </>
  )
}

export default App
