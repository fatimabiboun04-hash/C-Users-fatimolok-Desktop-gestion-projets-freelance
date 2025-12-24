import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaFolderOpen, FaPlusCircle, FaBriefcase } from 'react-icons/fa';

function AppNavbar() {
  return (
    <Navbar 
      variant="dark" 
      expand="lg" 
      className="shadow-sm sticky-top"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <FaBriefcase className="me-2" />
          FreeLance Pro
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2 fw-semibold text-white">
              <FaHome className="me-1" /> Accueil
            </Nav.Link>
            
            <Nav.Link as={Link} to="/dashboard" className="mx-2 fw-semibold text-white">
              <FaChartLine className="me-1" /> Dashboard
            </Nav.Link>
            
            <Nav.Link as={Link} to="/projets" className="mx-2 fw-semibold text-white">
              <FaFolderOpen className="me-1" /> Projets
            </Nav.Link>

            <Button 
              as={Link} 
              to="/projets/ajouter" 
              variant="light" 
              size="sm"
              className="ms-3 fw-semibold"
            >
              <FaPlusCircle className="me-1" /> Ajouter
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;