export const fetchProfessors = async (path, updateProfessors) => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const response = await fetch(`${path}/professors`, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'Application/json'
      },
    });
    updateProfessors(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching Professors:", error);
  }
};