import { useState,useEffect,useContext,createContext} from "react";
// import React from "react";

// export const Authorization = ()=>{
//     const [authToken,setauthToken] = useState("");
//     const updateauthToken = (newtoken)=>{
//         setauthToken(newtoken);
//     };
//     return [authToken,updateauthToken];
// };

const AuthContext  = createContext();
const AuthProvider = ({children})=>{
    const [authToken,setauthToken] = useState("");
    useEffect(()=>{
        const data = localStorage.getItem("authToken");
        if (data){
            setauthToken(data);
        }
    },[authToken])
    return (
        <AuthContext.Provider value={[authToken,setauthToken]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext);

export {useAuth, AuthProvider}