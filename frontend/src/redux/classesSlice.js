// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example asynchronous thunk to handle login
export const getClasses = createAsyncThunk(
  "classes/getClasses",
  async (_, thunkAPI) => {
    try {
      // Your asynchronous logic to fetch classes here
      const response = await fetch(`/class`);
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

export const updateClasses = createAsyncThunk(
  "classes/updateClasses",
  async ({ className, subject ,act}, thunkAPI) => {
    try {
      // Your asynchronous logic to update classes here
      const response = await fetch(`/class/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className, subject, act }),
      });

      // Check if response status is in the 2xx range
      if (response.ok) {
        // Return the response data
        return await response.json();
      } else {
        // If the response status is not in the 2xx range, throw an error
        throw new Error("Failed to update classes");
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const createClass = createAsyncThunk(
  "classes/createClass",
  async ({ class_name, class_section}, thunkAPI) => {
    try {
      const response = await fetch(`/class/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class_name, class_section }),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to update classes");
      }
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const initialState = {
  classes: null,
  loading: false,
  error: null,
  message: null,
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.classes = action.payload.classes;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; 
      })
      .addCase(updateClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
  },
});

export const { clearError, clearMessages } = classSlice.actions;
export default classSlice.reducer;
