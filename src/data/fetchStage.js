export const fetchStages = async (path, updateStages) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/stages`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateStages(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de stage :', error);
  }
};

export const fetchStage = async (path, updateStage, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/stages/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateStage(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de stage :', error);
  }
};

export const fetchStagesByStudent = async (path, updateStages, id) => {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  try {
    const response = await fetch(`${path}/stages/byStudent/${id}`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    });
    updateStages(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de stage :', error);
  }
};