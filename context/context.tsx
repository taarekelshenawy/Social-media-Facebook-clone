"use client"

import { createContext, useState, Dispatch, SetStateAction } from "react";



type AuthContextType = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  LogOut:()=>void;
};
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


type childrenProps ={
    children:React.ReactNode;
}

const AuthContextProvider=({children}:childrenProps)=>{
  const [token, setToken] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token") || "";
        }
        return "";
        });

    const LogOut=()=>{
        localStorage.removeItem('token');
        setToken('')
    }


    const contextValues={token,setToken,LogOut}
    return (
        <AuthContext.Provider value={contextValues}>
            {children}

        </AuthContext.Provider>
    )

}


export default AuthContextProvider;


