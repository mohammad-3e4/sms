// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 
export const getClasses = createAsyncThunk(
  "classes/getClasses",
  async (classValue, thunkAPI) => {
    try {
      let response
      if(classValue){
        response = await fetch(`/class?class=${classValue}`);
      }else{
        response = await fetch(`/class`);
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const updateClasses = createAsyncThunk(
  "classes/updateClasses",
  async ({ className, subject, action }, thunkAPI) => {
    try {
      // Your asynchronous logic to update classes here
      const response = await fetch(`/class/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className, subject, action }),
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

export const AssignSubject = createAsyncThunk(
  "classes/assignSubject",
  async ({teacher_id, class_name, subject}, thunkAPI) => {
    console.log(teacher_id,class_name, subject);
    try {
      const response = await fetch(`/class/assign/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher_id, class_name, subject }),
      });
      if (response.ok) {
        return await response.json();
      } else {
throw new Error("Failed to update classes");
      }
    } catch (error) {

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const removeAssignSubject = createAsyncThunk(
  "classes/removeAssignSubject",
  async ({ class_name, subject }, thunkAPI) => {
    try {
      // Your asynchronous logic to update classes here
      const response = await fetch(`/class/remove/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class_name, subject }),
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
  async (values, thunkAPI) => {
    try {
      const response = await fetch(`/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        // If response is not ok, handle the error and return it
        const errorData = await response.json();
        throw new Error(errorData.error);
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
  selectedClass: null,
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
    setClass: (state, action) => {
      state.selectedClass = action.payload;
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
      .addCase(AssignSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AssignSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(AssignSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(removeAssignSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAssignSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(removeAssignSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearError, clearMessages, setClass } = classSlice.actions;
export default classSlice.reducer;
