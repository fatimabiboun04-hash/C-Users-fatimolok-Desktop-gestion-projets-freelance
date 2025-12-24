import { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { FaMoneyBillWave, FaBriefcase, FaChartLine, FaPercentage } from 'react-icons/fa';

function Dashboard() {
  const projects = useSelector(state => state.projects.projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  const revenuTotal = projects
    .filter(p => p.status === 'Terminé')
    .reduce((sum, p) => sum + p.budget, 0);

  const budgetEnCours = projects
    .filter(p => p.status === 'En cours' || p.status === 'En attente')
    .reduce((sum, p) => sum + p.budget, 0);

  const projetsActifs = projects.filter(p => p.status === 'En cours').length;

  const termines = projects.filter(p => p.status === 'Terminé').length;
  const annules = projects.filter(p => p.status === 'Annulé').length;
  const tauxReussite = termines + annules > 0 
    ? ((termines / (termines + annules)) * 100).toFixed(1)
    : 0;

  const derniersProjets = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination 
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = derniersProjets.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(derniersProjets.length / cardsPerPage);

  return (
    <div>
      <section className="bg-light py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5 fw-bold mb-2">📊 Tableau de Bord</h1>
              <p className="text-muted mb-0">
                Vue d'ensemble de vos projets et performances
              </p>
            </div>
            <Button 
              as={Link} 
              to="/projets/ajouter" 
              variant="primary"
              size="lg"
            >
              ➕ Nouveau Projet
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4 mb-5">
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="bg-success bg-opacity-75 text-white rounded-circle p-3 me-3"
                    style={{width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  >
                    <FaMoneyBillWave size={24} />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Revenu Total</p>
                    <h3 className="fw-bold mb-0">
                      {revenuTotal.toLocaleString()} DH
                    </h3>
                  </div>
                </div>
                <p className="small text-muted mb-0">
                  Projets terminés uniquement
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="bg-warning bg-opacity-75 text-white rounded-circle p-3 me-3"
                    style={{width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  >
                    <FaBriefcase size={24} />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Budget En Cours</p>
                    <h3 className="fw-bold mb-0">
                      {budgetEnCours.toLocaleString()} DH
                    </h3>
                  </div>
                </div>
                <p className="small text-muted mb-0">
                  Projets actifs + en attente
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="bg-primary bg-opacity-75 text-white rounded-circle p-3 me-3"
                    style={{width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  >
                    <FaChartLine size={24} />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Projets Actifs</p>
                    <h3 className="fw-bold mb-0">{projetsActifs}</h3>
                  </div>
                </div>
                <p className="small text-muted mb-0">
                  Projets en cours actuellement
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="bg-info bg-opacity-75 text-white rounded-circle p-3 me-3"
                    style={{width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  >
                    <FaPercentage size={24} />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Taux de Réussite</p>
                    <h3 className="fw-bold mb-0">{tauxReussite}%</h3>
                  </div>
                </div>
                <p className="small text-muted mb-0">
                  Terminés vs Annulés
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">📋 Derniers Projets</h3>
          <div>
            {totalPages > 1 && (
              <span className="text-muted small me-3">
                Page {currentPage} sur {totalPages}
              </span>
            )}
            <Button 
              as={Link} 
              to="/projets" 
              variant="outline-primary"
            >
              Voir Tous les Projets →
            </Button>
          </div>
        </div>

        {currentCards.length > 0 ? (
          <>
            <Row className="g-4 mb-4">
              {currentCards.map(project => (
                <Col key={project.id} md={6} lg={3}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>

            {/* Pagination pour Cards */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                  />
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  
                  <Pagination.Next 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <Card className="border-0 shadow-sm text-center py-5">
            <Card.Body>
              <h5 className="text-muted mb-3">Aucun projet pour le moment</h5>
              <Button as={Link} to="/projets/ajouter" variant="primary">
                ➕ Créer votre premier projet
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;