// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example asynchronous thunk to handle login
export const addStudent = createAsyncThunk(
  "student/addmission",
  async (values, thunkAPI) => {
    
    try {
      // Your asynchronous logic to authenticate user here
      const response = await fetch("/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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

const initialState = {
  students: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
    clearErrors: (state)=>{
      state.error = null;
    }
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
        state.students = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; 
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
