// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example asynchronous thunk to handle login
export const getSubjects = createAsyncThunk(
  "classes/getSubjects",
  async (_, thunkAPI) => {
    try {
      // Your asynchronous logic to fetch classes here
      const response = await fetch(`/class/subject`);

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

export const deleteSubjects = createAsyncThunk(
  "classes/deleteSubjects",
  async (deleteSubjects, thunkAPI) => {
    try {
      const response = await fetch(`/class/subject/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteSubjects),
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
export const addSubjects = createAsyncThunk(
  "classes/addSubjects",
  async (subjects, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/class/subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjects),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  subjects: null,
  loading: false,
  error: null,
  message: null,
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Define any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; // Use error message from rejected action
      })

      .addCase(deleteSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; // Use error message from rejected action
      })
      .addCase(addSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; // Use error message from rejected action
      });
  },
});

export const { clearError, clearMessages } = subjectsSlice.actions;
export default subjectsSlice.reducer;
