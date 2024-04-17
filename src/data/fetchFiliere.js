export const fetchFilieres = async (path, updateFilieres) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/filieres`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFilieres(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des filieres :', error);
  }
};

export const fetchFiliere = async (path, updateFiliere, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/filieres/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateFiliere(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la filiere :', error);
  }
};