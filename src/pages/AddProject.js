import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../redux/projectsSlice';
import { Container, Form, Button, Card } from 'react-bootstrap';

function AddProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: '',
    title: '',
    budget: '',
    deadline: '',
    status: 'Devis',
    priority: 'Moyenne',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.clientName || !formData.title || !formData.budget || !formData.deadline) {
      alert('Veuillez remplir tous les champs obligatoires!');
      return;
    }

    if (formData.budget <= 0) {
      alert('Le budget doit être supérieur à 0!');
      return;
    }

    dispatch(addProject({
      clientName: formData.clientName,
      title: formData.title,
      budget: parseFloat(formData.budget),
      deadline: formData.deadline,
      status: formData.status,
      priority: formData.priority,
      description: formData.description
    }));

    navigate('/projets');
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Header 
          className="text-white"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <h3 className="mb-0">➕ Ajouter un Nouveau Projet</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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

            <div className="d-flex gap-2">
              <Button 
                type="submit" 
                className="px-4 text-white"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                ✅ Ajouter le Projet
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

export default AddProject;