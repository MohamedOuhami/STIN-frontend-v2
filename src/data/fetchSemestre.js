export const fetchSemestres = async (path, updateSemestres) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/semestres`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateSemestres(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des semestres :', error);
  }
};

export const fetchSemestre = async (path, updateSemestre, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/semestres/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateSemestre(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du semestre :', error);
  }
};