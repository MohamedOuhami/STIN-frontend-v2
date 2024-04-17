export const fetchPfes = async (path, updatePFEs) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/pfes`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updatePFEs(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de PFEs :', error);
  }
};

export const fetchPFE = async (path, updatePFE, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/pfes/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updatePFE(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du pfe :', error);
  }
};