import React,{useState,useEffect} from "react";


const UseDarkMode= ()=> {
    const [isDarkMode,setDarkMode]= useState(()=>localStorage.theme==='dark');
    const toggleMode=()=>{
      setDarkMode(!isDarkMode);
    };
    
    useEffect(()=>{
      const html=window.document.documentElement;

      const prevTheme=isDarkMode?"light":"dark";
      html.classList.remove(prevTheme);

      const nextTheme=isDarkMode?"dark":"light";
      html.classList.add(nextTheme);

      localStorage.setItem("theme",nextTheme);

    },[isDarkMode]);

     return [isDarkMode,toggleMode];

}

export default UseDarkMode;