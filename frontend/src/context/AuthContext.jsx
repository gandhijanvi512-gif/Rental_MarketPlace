import { createContext } from "react";
import api from "../service/api";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const AuthContext=createContext();


export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)

    const getCurrentUser=async()=>{
        try{
            const response=await api.get("/getme");
            setUser(response.data.user);
        }catch(err){
            setUser(null)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[]);

    // const logout=async


    return(
        <AuthContext.Provider
            value={{user,setUser,loading,getCurrentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}