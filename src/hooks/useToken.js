import { useEffect, useState } from "react"
import { appendErrors } from "react-hook-form";

const useToken = user =>{
    const [token, useToken] = useState("");
    useEffect(()=>{
        const email = user?.user?.email;
        const name = user?.user?.displayName;
        const currentUser = { email: email, name: name, role: "producer" };
        if(email){
           
        }
    },[user])
}

export default useToken;