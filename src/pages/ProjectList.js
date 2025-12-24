import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProject, updateStatus, deleteAll, resetToInitial } from '../redux/projectsSlice';
import { Container, Table, Form, Button, Badge, Dropdown, ButtonGroup, Alert, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaFilter, FaRedo } from 'react-icons/fa';

function ProjectList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(state => state.projects.projects);

  // State للفيلترات و Pagination
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [priorityFilter, setPriorityFilter] = useState('Toutes');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Devis': return 'primary';
      case 'En cours': return 'warning';
      case 'En attente': return 'info';
      case 'Terminé': return 'success';
      case 'Annulé': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Basse': return 'secondary';
      case 'Moyenne': return 'info';
      case 'Haute': return 'warning';
      case 'Urgente': return 'danger';
      default: return 'secondary';
    }
  };

  // Filtrage
  const filteredProjects = projects.filter(p => {
    const statusMatch = statusFilter === 'Tous' || p.status === statusFilter;
    const priorityMatch = priorityFilter === 'Toutes' || p.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Tri (Sort)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'clientName') {
      comparison = a.clientName.localeCompare(b.clientName);
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'budget') {
      comparison = a.budget - b.budget;
    } else if (sortBy === 'deadline') {
      comparison = new Date(a.deadline) - new Date(b.deadline);
    } else if (sortBy === 'createdAt') {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  // Actions
  const handleDelete = (id, title) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      dispatch(deleteProject(id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateStatus({ id, newStatus }));
  };

  const handleDeleteAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer TOUS les projets ?')) {
      dispatch(deleteAll());
      setCurrentPage(1);
    }
  };

  const handleReset = () => {
    if (window.confirm('Réinitialiser aux données initiales (6 projets) ?')) {
      dispatch(resetToInitial());
      setCurrentPage(1);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">📋 Liste des Projets</h1>
        <Button 
          variant="primary" 
          onClick={() => navigate('/projets/ajouter')}
        >
          ➕ Nouveau Projet
        </Button>
      </div>

      {/* Filtres + Actions */}
      <div className="bg-light p-3 rounded mb-4">
        <div className="row g-3">
          {/* Filtre Statut */}
          <div className="col-md-3">
            <Form.Label className="fw-semibold small">
              <FaFilter className="me-1" /> Statut
            </Form.Label>
            <Form.Select 
              value={statusFilter} 
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
              size="sm"
            >
              <option value="Tous">Tous</option>
              <option value="Devis">Devis</option>
              <option value="En cours">En cours</option>
              <option value="En attente">En attente</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </Form.Select>
          </div>

          {/* Filtre Priorité */}
          <div className="col-md-3">
            <Form.Label className="fw-semibold small">
              <FaFilter className="me-1" /> Priorité
            </Form.Label>
            <Form.Select 
              value={priorityFilter} 
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                handleFilterChange();
              }}
              size="sm"
            >
              <option value="Toutes">Toutes</option>
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
              <option value="Urgente">Urgente</option>
            </Form.Select>
          </div>

          {/* Tri */}
          <div className="col-md-3">
            <Form.Label className="fw-semibold small">Trier par</Form.Label>
            <Form.Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              size="sm"
            >
              <option value="createdAt">Date création</option>
              <option value="clientName">Client</option>
              <option value="title">Titre</option>
              <option value="budget">Budget</option>
              <option value="deadline">Deadline</option>
            </Form.Select>
          </div>

          {/* Boutons Actions */}
          <div className="col-md-3 d-flex flex-column">
            <Form.Label className="fw-semibold small">Actions</Form.Label>
            <ButtonGroup size="sm">
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setStatusFilter('Tous');
                  setPriorityFilter('Toutes');
                  setCurrentPage(1);
                }}
              >
                <FaRedo /> Réinitialiser
              </Button>
              <Button variant="outline-danger" onClick={handleDeleteAll}>
                🗑️ Tout Supprimer
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* Bouton Reset Données */}
        <div className="mt-3">
          <Button variant="info" size="sm" onClick={handleReset}>
            🔄 Réinitialiser aux données initiales (6 projets)
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <span className="text-muted small">
          Affichage de <strong>{indexOfFirstItem + 1}</strong> à <strong>{Math.min(indexOfLastItem, sortedProjects.length)}</strong> sur <strong>{sortedProjects.length}</strong> projet(s)
        </span>
        {totalPages > 1 && (
          <span className="text-muted small">
            Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
          </span>
        )}
      </div>

      {/* Table */}
      {currentProjects.length > 0 ? (
        <>
          <div className="table-responsive">
            <Table striped bordered hover className="bg-white shadow-sm">
              <thead style={{backgroundColor: '#e8eaf6'}}>
                <tr>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('clientName')}
                  >
                    Client {sortBy === 'clientName' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('title')}
                  >
                    Titre {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('budget')}
                  >
                    Budget {sortBy === 'budget' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('deadline')}
                  >
                    Deadline {sortBy === 'deadline' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Statut</th>
                  <th>Priorité</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map(project => (
                  <tr key={project.id}>
                    <td className="fw-semibold">{project.clientName}</td>
                    <td>{project.title}</td>
                    <td>{project.budget.toLocaleString()} DH</td>
                    <td>{new Date(project.deadline).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle 
                          variant={getStatusColor(project.status)} 
                          size="sm"
                        >
                          {project.status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleStatusChange(project.id, 'Devis')}>
                            Devis
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(project.id, 'En cours')}>
                            En cours
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(project.id, 'En attente')}>
                            En attente
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(project.id, 'Terminé')}>
                            Terminé
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(project.id, 'Annulé')}>
                            Annulé
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <Badge bg={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <ButtonGroup size="sm">
                        <Button 
                          variant="outline-primary" 
                          onClick={() => navigate(`/projets/modifier/${project.id}`)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger"
                          onClick={() => handleDelete(project.id, project.title)}
                        >
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First 
                  onClick={() => setCurrentPage(1)} 
                  disabled={currentPage === 1}
                />
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
                <Pagination.Last 
                  onClick={() => setCurrentPage(totalPages)} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <Alert variant="info" className="text-center">
          <h5>Aucun projet trouvé</h5>
          <p>Aucun projet ne correspond aux filtres sélectionnés.</p>
          <Button 
            variant="outline-info" 
            onClick={() => {
              setStatusFilter('Tous');
              setPriorityFilter('Toutes');
              setCurrentPage(1);
            }}
          >
            Réinitialiser les filtres
          </Button>
        </Alert>
      )}
    </Container>
  );
}

export default ProjectList;