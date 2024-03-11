export const adminLogin = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/signin', {
        method: 'POST',

        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
      if (!responseData.success) {
        console.log(responseData.error);
        return { error: responseData.error ? responseData.error.message : 'Unknown error' };
      }
      console.log(responseData);
      return { data: responseData, error: null };
    } catch (error) {
        console.log(error);
      return { data: null, error: error.message };
    }
  };
  
  