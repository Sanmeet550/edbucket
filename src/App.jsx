import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import SolutionsPartner from './pages/SolutionsPartner'
import SolutionsUniversity from './pages/SolutionsUniversity'
import HowItWorks from './pages/HowItWorks'
import TechCapabilities from './pages/TechCapabilities'
import CaseStudies from './pages/CaseStudies'
import UniversitiesPage from './pages/UniversitiesPage'
import UniversityDetail from './pages/UniversityDetail'
import Countries from './pages/Countries'

// Portal Pages
import CountryDetail from './pages/CountryDetail'
import ApplicationForm from './pages/ApplicationForm'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import CountryManager from './pages/admin/CountryManager'
import ApplicationManager from './pages/admin/ApplicationManager'
import ConsultationManager from './pages/admin/ConsultationManager'
import LoginPage from './pages/admin/LoginPage'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('admin_token')
    if (!token) return <Navigate to="/admin/login" replace />
    return children
}

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle('dark')
    }

    // Handle smooth scrolling for hash links
    useEffect(() => {
        const handleAnchorClick = (e) => {
            const link = e.target.closest('a')
            const href = link?.getAttribute('href')
            if (href?.includes('#')) {
                const [path, hash] = href.split('#')
                // Only smooth scroll if we are already on that path
                if (path === '' || path === window.location.pathname) {
                    e.preventDefault()
                    const elem = document.getElementById(hash)
                    if (elem) {
                        window.scrollTo({
                            top: elem.offsetTop - 80,
                            behavior: 'smooth'
                        })
                    }
                }
            }
        }
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick)
        })
        return () => {
            document.querySelectorAll('a[href*="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick)
            })
        }
    }, [])

    return (
        <Router>
            <ScrollToTop />
            <div className={`min-h-screen selection:bg-accent selection:text-primary transition-colors duration-500 ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-background text-primary'}`}>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/solutions/partners" element={<SolutionsPartner />} />
                    <Route path="/solutions/universities" element={<SolutionsUniversity />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/technology" element={<TechCapabilities />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Portal Routes */}
                    <Route path="/countries" element={<Countries />} />
                    <Route path="/countries/:slug" element={<CountryDetail />} />
                    <Route path="/universities" element={<UniversitiesPage />} />
                    <Route path="/universities/:slug" element={<UniversityDetail />} />
                    <Route path="/apply/:universityId" element={<ApplicationForm />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/countries" element={
                        <ProtectedRoute>
                            <CountryManager />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/applications" element={
                        <ProtectedRoute>
                            <ApplicationManager />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/consultations" element={
                        <ProtectedRoute>
                            <ConsultationManager />
                        </ProtectedRoute>
                    } />
                </Routes>

                <Footer />
            </div>
        </Router>
    )
}

export default App
