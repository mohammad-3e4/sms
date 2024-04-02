import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example asynchronous thunk to handle login
export const addStudent = createAsyncThunk(
  "student/addmission",
  async (values, thunkAPI) => {
    try {
      // Your asynchronous logic to add student here
      const response = await fetch("/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to get students
export const getStudents = createAsyncThunk(
  "student/getStudents",
  async (classValue, thunkAPI) => {
    console.log(classValue);
    try {
      const response = await fetch(`/student?class=${classValue}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to delete student
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (studentId, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`/student/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return studentId;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ studentId, updatedData }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here

      const response = await fetch(`/student/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getStudentById = createAsyncThunk(
  "student/getStudent",
  async (studentId, thunkAPI) => {
    try {
      // Your asynchronous logic to update student her
      const response = await fetch(`/student/${studentId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const toggleAttendance = createAsyncThunk(
  "student/toggleAttendance",
  async ({ studentId, day }) => {
    try {
      const requestBody = {
        student_id: studentId,
        attendance: day,
      };

      const response = await fetch("/student/attendance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteEntry = createAsyncThunk(
  "attendance/deleteEntry",
  async ({ studentId, day }, thunkAPI) => {
    const requestBody = {
      student_id: studentId,
      attendance: day,
    };
    console.log(requestBody);
    try {
      const response = await fetch("/student/present", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getAbsents = createAsyncThunk(
  "student/Absensts",
  async (classValue, thunkAPI) => {
    try {
      const response = await fetch(`/student/absents`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const uploadDocuments = createAsyncThunk(
  "student/uploadDocuments",
  async ({ student_id, document_name, file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file); 
      formData.append('document_name', document_name); 

      const response = await fetch(`/student/upload/${student_id}`, {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const initialState = {
  students: null,
  loading: false,
  error: null,
  message: null,
  student: null,
  absents: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = action.payload.students;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.student = action.payload.student;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getAbsents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAbsents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.absents = action.payload.absents;
      })
      .addCase(getAbsents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(toggleAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(toggleAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(uploadDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(uploadDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage } = studentSlice.actions;

export default studentSlice.reducer;
