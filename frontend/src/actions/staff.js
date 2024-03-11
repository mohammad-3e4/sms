export const addStaff = async (data, token) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (!responseData.success) {
      console.log(responseData.error);
      return { error: responseData.error ? responseData.error.message : 'Unknown error' };
    }
    
    return { data: responseData, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

