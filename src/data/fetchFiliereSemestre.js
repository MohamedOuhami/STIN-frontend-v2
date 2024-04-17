export const fetchFiliereSemestres = async (path, updateFiliereSemestres) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/filiere_semestre`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFiliereSemestres(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des filiere semestre :', error);
  }
};

export const fetchFiliereSemestre = async (path, updateFiliereSemestre, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/filiere_semestre/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFiliereSemestre(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des données du filiere semestre :', error);
  }
};

export const fetchFiliereSemestreBySemestre = async (path, updateFiliereSemestre, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/filiere_semestre/semestre/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFiliereSemestre(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du filiere semestre par semestre :', error);
  }
};

export const fetchFiliereSemestreByFiliere = async (path, updateFiliereSemestre, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`
  try {
    const response = await fetch(`${path}/filiere_semestre/filiere/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFiliereSemestre(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du filiere semestre par filiere :', error);
  }
};