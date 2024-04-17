export const fetchGroupeProjets = async (path, updateGroupeProjets) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/groupe_projects`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateGroupeProjets(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes projet :', error);
  }
};

export const fetchGroupeProjet = async (path, updateGroupeProjet, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/groupe_projects/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateGroupeProjet(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération du groupe de projet :', error);
  }
};

export const fetchGroupeProjetByEncadrant = async (path, updateGroupeProjets, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/groupe_projects/encadrant/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateGroupeProjets(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes projet de l\'encadrant :', error);
  }
};

export const fetchGroupeProjetByFiliereSemestre = async (path, updateGroupeProjets, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/groupe_projects/filiereSemestre/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateGroupeProjets(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes projet filiereSemestre :', error);
  }
};

export const fetchGroupeProjetByEtudiantIngenieur = async (path, updateGroupeProjet, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/groupe_projects/student/groupeProject/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateGroupeProjet(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération du groupe projet de l\'etudiant :', error);
  }
};