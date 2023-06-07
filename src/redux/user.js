import {createSlice} from '@reduxjs/toolkit'

const inistialState={
    user:null,
    loading:false,
    err:null
}
const userSlice =createSlice({
    name:'user',
    inistialState,
    reducers:{
    loginStart:(state)=>{
    state.loading = true;
    },
    loginSuccess:(state,action)=>{
    state.user=action.payload;
    state.loading = false;
    },
    loginFailure:(state)=>{
        state.err=true
        state.loading=false
    },
    logOut:()=>{
    return inistialState
    }
    }
})
export const {loginFailure,loginStart,loginSuccess,logOut}=userSlice.actions
export default userSlice.reducer