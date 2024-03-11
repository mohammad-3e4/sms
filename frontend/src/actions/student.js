// export const csvUplaod = async (csv) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", csv);
//     const response = await axios.post(
//       `${URL}/admin/upload/student-data`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     setMessage(response.data.message);
//     setTimeout(() => {
//       setMessage("");
//       setCsvFile("");
//     }, 5000);
//   } catch (error) {
//     setError(error.response.data.error);
//     setTimeout(() => {
//       setError("");
//     }, 5000);
//   }
// };

export const addStudent = async (data, token) => {
  try {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to add student');
    }

    const responseData = await response.json();
    return responseData; // Assuming the response from backend is JSON
  } catch (error) {
    console.error('Error adding student:', error.message);
    throw error;
  }
};
