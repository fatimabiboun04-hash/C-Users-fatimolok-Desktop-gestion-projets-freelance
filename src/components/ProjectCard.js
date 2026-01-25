import { Card, Badge, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProject, updateStatus } from '../redux/projectsSlice';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Devis':
        return 'primary';
      case 'En cours':
        return 'warning';
      case 'En attente':
        return 'info';
      case 'Terminé':
        return 'success';
      case 'Annulé':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Basse':
        return 'secondary';
      case 'Moyenne':
        return 'info';
      case 'Haute':
        return 'warning';
      case 'Urgente':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // حذف البروجي
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?`)) {
      dispatch(deleteProject(project.id));
    }
  };

  // تعديل البروجي
  const handleEdit = () => {
    navigate(`/projets/modifier/${project.id}`);
  };

  // تغيير الستاتوس
  const handleStatusChange = (newStatus) => {
    dispatch(updateStatus({ id: project.id, newStatus }));
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        {/* Header: Titre + Actions */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="fw-bold text-primary mb-1">
              {project.title}
            </Card.Title>
            <Card.Subtitle className="text-muted small">
              Client: {project.clientName}
            </Card.Subtitle>
          </div>

          {/* Menu Actions */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              size="sm" 
              className="border-0"
            >
              <FaEllipsisV />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEdit}>
                <FaEdit className="me-2" /> Modifier
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDelete} className="text-danger">
                <FaTrash className="me-2" /> Supprimer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Badges: Statut & Priorité */}
        <div className="mb-3">
          <Badge bg={getStatusColor(project.status)} className="me-2">
            {project.status}
          </Badge>
          <Badge bg={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
        </div>

        {/* Infos: Budget & Deadline */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted small">Budget:</span>
            <span className="fw-semibold">{project.budget.toLocaleString()} DH</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted small">Deadline:</span>
            <span className="fw-semibold">
              {new Date(project.deadline).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <Card.Text className="text-muted small mb-3">
            {project.description.length > 80
              ? project.description.substring(0, 80) + '...'
              : project.description}
          </Card.Text>
        )}

        {/* Changement Status Rapide */}
        <Dropdown className="d-grid">
          <Dropdown.Toggle variant="outline-primary" size="sm">
            Changer Statut
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
            <Dropdown.Item onClick={() => handleStatusChange('Devis')}>
              Devis
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('En cours')}>
              En cours
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('En attente')}>
              En attente
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('Terminé')}>
              Terminé
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('Annulé')}>
              Annulé
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;