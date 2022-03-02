import "../Styles/App.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

function Logout() {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem("idToken");
        localStorage.removeItem("userID");
        navigate("/");
        //const [value, setValue] = React.useState(0);
        //this.setState();
        //needs to update state of navbar
        window.location.reload(false);
        
    }, [])
    
    
    return(
        null
    );
}

export default Logout;