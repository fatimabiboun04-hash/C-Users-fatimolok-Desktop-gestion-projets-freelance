import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProject } from '../redux/projectsSlice';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function EditProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  
  const project = useSelector(state => 
    state.projects.projects.find(p => p.id === parseInt(id))
  );

  // State 
  const [formData, setFormData] = useState({
    clientName: '',
    title: '',
    budget: '',
    deadline: '',
    status: 'Devis',
    priority: 'Moyenne',
    description: ''
  });

  
  useEffect(() => {
    if (project) {
      setFormData({
        clientName: project.clientName,
        title: project.title,
        budget: project.budget,
        deadline: project.deadline,
        status: project.status,
        priority: project.priority,
        description: project.description || ''
      });
    }
  }, [project]);

 
  if (!project) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>❌ Projet introuvable!</Alert.Heading>
          <p>Le projet avec l'ID <strong>{id}</strong> n'existe pas.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={() => navigate('/projets')}>
              Retour à la liste
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.clientName || !formData.title || !formData.budget || !formData.deadline) {
      alert('Veuillez remplir tous les champs obligatoires!');
      return;
    }

    if (formData.budget <= 0) {
      alert('Le budget doit être supérieur à 0!');
      return;
    }

    
    dispatch(editProject({
      id: project.id,
      updatedData: {
        clientName: formData.clientName,
        title: formData.title,
        budget: parseFloat(formData.budget),
        deadline: formData.deadline,
        status: formData.status,
        priority: formData.priority,
        description: formData.description
      }
    }));

  
    navigate('/projets');
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-warning text-dark">
          <h3 className="mb-0">✏️ Modifier le Projet</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Nom Client */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Nom du Client <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Ex: Mohamed Alami"
                required
              />
            </Form.Group>

            {/* Titre Projet */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Titre du Projet <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Site E-commerce"
                required
              />
            </Form.Group>

            {/* Budget & Deadline */}
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Budget (DH) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Ex: 25000"
                    min="1"
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Deadline <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            {/* Statut & Priorité */}
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Statut</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Devis">Devis</option>
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Annulé">Annulé</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Priorité</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                    <option value="Urgente">Urgente</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            {/* Description */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez le projet..."
              />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <Button type="submit" variant="warning" className="px-4">
                💾 Enregistrer les modifications
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                className="px-4"
                onClick={() => navigate('/projets')}
              >
                ❌ Annuler
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditProject;