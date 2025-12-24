 import {createSlice} from '@reduxjs/toolkit';
 const INITIAL_PROJECTS = [
  
    {
      id: 1,
      clientName: "Mohamed Alami",
      title: "Site E-commerce",
      budget: 25000,
      deadline: "2025-01-15",
      status: "En cours",
      priority: "Urgente",
      description: "Site de vente en ligne avec paiement intégré",
      createdAt: "2024-11-20"
    },
    {
      id: 2,
      clientName: "Fatima Zahra",
      title: "Logo Design",
      budget: 3500,
      deadline: "2024-12-25",
      status: "Devis",
      priority: "Basse",
      description: "Création logo et identité visuelle",
      createdAt: "2024-11-25"
    },
    {
      id: 3,
      clientName: "Hassan Bennani",
      title: "Application Mobile",
      budget: 45000,
      deadline: "2025-02-28",
      status: "En attente",
      priority: "Haute",
      description: "Application de livraison à domicile",
      createdAt: "2024-11-18"
    },
    {
      id: 4,
      clientName: "Sara El Amrani",
      title: "Site Vitrine Restaurant",
      budget: 8000,
      deadline: "2024-12-10",
      status: "Terminé",
      priority: "Moyenne",
      description: "Site vitrine avec menu en ligne",
      createdAt: "2024-10-15"
    },
    {
      id: 5,
      clientName: "Omar Tazi",
      title: "Refonte Site Web",
      budget: 18000,
      deadline: "2024-11-30",
      status: "Annulé",
      priority: "Haute",
      description: "Modernisation site corporate",
      createdAt: "2024-10-20"
    },
    {
      id: 6,
      clientName: "Amina Chakir",
      title: "Dashboard Analytics",
      budget: 22000,
      deadline: "2025-01-25",
      status: "En cours",
      priority: "Urgente",
      description: "Tableau de bord avec graphiques interactifs",
      createdAt: "2024-11-30"
    }
  ];
  const initialState={
    projects:INITIAL_PROJECTS,
    nextId:7
  };
 
const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newProject = {
                ...action.payload,
                id: state.nextId,
                createdAt: new Date().toISOString().split('T')[0]  
            };
            state.projects.push(newProject);
            state.nextId += 1;
        },
        editProject: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.projects.findIndex(p => p.id === id);
            if (index !== -1) {
                state.projects[index] = {
                    ...state.projects[index],
                    ...updatedData
                };
            }
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        },
        updateStatus: (state, action) => {
            const { id, newStatus } = action.payload;
            const project = state.projects.find(p => p.id === id);
            if (project) {
                project.status = newStatus;
            }
        },
        deleteAll: (state) => {
            state.projects = [];
        },  
        resetToInitial: (state) => {  
            state.projects = [...INITIAL_PROJECTS];
            state.nextId = 7;
        }
    }  
});
export const {
    addProject,
    editProject,
    deleteProject,
    updateStatus,deleteAll,
    resetToInitial
}=projectsSlice.actions;
export default projectsSlice.reducer;

