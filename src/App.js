import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projets" element={<ProjectList />} />
        <Route path="/projets/ajouter" element={<AddProject />} />
        <Route path="/projets/modifier/:id" element={<EditProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

