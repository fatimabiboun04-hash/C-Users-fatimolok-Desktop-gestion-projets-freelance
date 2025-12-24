import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaChartBar, FaCheckCircle, FaRocket, FaUser } from 'react-icons/fa';

function LandingPage() {
  return (
    <div>
     
      <section 
        className="text-white d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '90vh'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-2 fw-bold mb-4">
                Gérez vos projets <br/>
                <span style={{color: '#ffd700'}}>comme un pro</span>
              </h1>
              <p className="lead fs-4 mb-4">
                Solution moderne et intuitive pour freelancers. Suivez vos projets, 
                analysez vos performances et développez votre activité.
              </p>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <FaCheckCircle className="text-warning me-2" size={22} />
                  <span className="fs-5">Interface simple et rapide</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaCheckCircle className="text-warning me-2" size={22} />
                  <span className="fs-5">Statistiques en temps réel</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-warning me-2" size={22} />
                  <span className="fs-5">100% gratuit pour toujours</span>
                </div>
              </div>

              <Button 
                as={Link} 
                to="/dashboard" 
                size="lg"
                className="px-5 py-3 fw-bold shadow-lg"
                style={{
                  background: '#ffd700',
                  border: 'none',
                  color: '#1a1a2e',
                  borderRadius: '50px',
                  fontSize: '1.2rem'
                }}
              >
                <FaRocket className="me-2" />
                Commencer maintenant
              </Button>
            </Col>

            <Col lg={5} className="d-none d-lg-block">
              <div className="text-center">
                <div 
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '30px',
                    padding: '60px 40px',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <FaProjectDiagram size={150} className="text-warning mb-4" />
                  <h3 className="fw-bold mb-3">Tableau de Bord Complet</h3>
                  <p className="mb-0 fs-5">Visualisez tous vos projets en un coup d'œil</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{background: '#f8f9fa'}}>
        <Container>
          <h2 className="text-center fw-bold mb-5 display-5">
            Tout ce dont vous avez besoin
          </h2>
          
          <Row className="g-4">
            <Col md={4}>
              <Card 
                className="text-center h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '20px',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="p-5">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: 90,
                      height: 90,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <FaProjectDiagram size={45} className="text-white" />
                  </div>
                  <h4 className="fw-bold mb-3">Suivi des Projets</h4>
                  <p className="text-muted mb-0">
                    Organisez et suivez tous vos projets avec des statuts clairs et un système de priorités.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card 
                className="text-center h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '20px',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="p-5">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: 90,
                      height: 90,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    }}
                  >
                    <FaChartBar size={45} className="text-white" />
                  </div>
                  <h4 className="fw-bold mb-3">Statistiques</h4>
                  <p className="text-muted mb-0">
                    Analysez vos revenus, taux de réussite et performances avec des graphiques détaillés.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card 
                className="text-center h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '20px',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="p-5">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: 90,
                      height: 90,
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    }}
                  >
                    <FaUser size={45} className="text-white" />
                  </div>
                  <h4 className="fw-bold mb-3">Gestion Clients</h4>
                  <p className="text-muted mb-0">
                    Gérez vos clients et leurs projets de manière professionnelle et organisée.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

     
     
      <section 
        className="py-5 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Container>
          <h2 className="display-4 fw-bold mb-4">Prêt à démarrer?</h2>
          <p className="lead fs-4 mb-4">
            Créez votre compte gratuitement et commencez à gérer vos projets dès maintenant
          </p>
          <Button 
            as={Link} 
            to="/projets/ajouter"
            size="lg"
            className="px-5 py-3 fw-bold shadow-lg"
            style={{
              background: '#ffd700',
              border: 'none',
              color: '#1a1a2e',
              borderRadius: '50px',
              fontSize: '1.2rem'
            }}
          >
            Créer un projet →
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <p className="mb-1">© 2024 Gestion Projets Freelance</p>
          <p className="mb-0 small text-white-50">Conçu avec  par Youssef - Rabat, Maroc</p>
        </Container>
      </footer>
    </div>
  );
}

export default LandingPage;