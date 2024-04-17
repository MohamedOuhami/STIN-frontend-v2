export const fetchEtudiantIngenieurs = async (path, updateEtudiantIngenieurs) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/ingStudents/admin/all`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      updateEtudiantIngenieurs(data);
      console.log(data);
    } else {
      throw new Error('Erreur lors de la récupération des données de l\'étudiant');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'étudiant :', error);
  }
};

export const fetchEtudiantIngenieur = async (path, updateEtudiantIngenieur, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/ingStudents/admin/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      updateEtudiantIngenieur(data);
      console.log(data);
    } else {
      throw new Error('Erreur lors de la récupération des données de l\'étudiant');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'étudiant :', error);
  }
};