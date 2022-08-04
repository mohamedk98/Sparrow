import React,{useState,useEffect} from "react";

function useDarkMod () {
    const [theme,setTheme]= useState('light');
    const colorTheme=theme==='light'?'dark':'light';
    //if setTheme or colorTheme value changed
    useEffect(() => {
        const root=window.document.documentElement;
        root.classList.add(theme);
        //To prevent an infinite loop of switching colors
        root.classList.remove(colorTheme);

    }, [setTheme,colorTheme]);
    
  return [setTheme,colorTheme];
}

export default useDarkMod;