import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  {API, setTokenHeader} from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue,navigate ,toast }, { rejectWithValue }) => {
    try {
        console.log('api',formValue)
      const response = await API.get("/registrations/user/login", {params: {
        loginId: formValue.email,
        password: formValue.password
      }});

      if(response.data.status=="success"){
        let token = response.data.results.token;
        localStorage.setItem("token", token)

        localStorage.setItem("empDetails", JSON.stringify(response.data.results))
        setTokenHeader(token)
      toast.success("Login Successfully");
       
       navigate("/dashboard");
      }else{
        console.log('login failed')
        toast.error("Login Failed");
      }
      return response.data;
    } catch (err) {
      console.log('13', err);
      return rejectWithValue(err.response.data);
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  },
});


export default authSlice.reducer;
