import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import DestinationDetails from './pages/DestinationDetails';
import DestinationTemplate from './components/DestinationTemplate.tsx';
import CreatorDashboard from './pages/creator/Dashboard';
import ComparisonResults from './pages/ComparisonResults';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destination/:title" element={<DestinationTemplate />} />
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/comparison-results" element={<ComparisonResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;





