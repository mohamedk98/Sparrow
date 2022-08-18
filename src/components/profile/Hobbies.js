import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { AiOutlineClose } from 'react-icons/ai';
import { axiosInstance } from '../../network/axiosInstance';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import { t } from 'i18next';

function Hobbies({showHobbies, setShowHobbies}) {
    const dispatch = useDispatch();
    const [hobbies, setHobbies] =useState([])
    const [music, setMusic] = useState(false)
    const [reading, setReading] = useState(false)
    const [travelling, setTravelling] = useState(false)
    const [movies, setMovies] = useState(false)
    const [art, setArt] = useState(false)
    const [cooking, setCooking] = useState(false)
    const [swimming, setSwimming] = useState(false)
    const [eating, setEating] = useState(false)
    const [dance, setDance] = useState(false)
    const [singing, setSinging] = useState(false)

    const hobbiesHandler = () =>{
        axiosInstance
        .patch("/profile/hobbies", {hobbies})
        .then((response) => {
            dispatch(addUserData(response.data))
            setShowHobbies(false)
        })
        .catch(error => console.log(error));
    }
    return (
    <div className='fixed dark:text-black top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
        <div className='lg:w-2/5 w-4/5 mx-auto mt-5 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700'>
            <div className='relative mb-3 text-black  dark:text-slate-100'>
                <div className='text-center text-xl font-semibold'>{t('Choose Hobbies')}</div>
                <button className='absolute right-2 top-0 text-xl' onClick={()=>setShowHobbies(false)}>
                    <AiOutlineClose/>
                </button>
            </div>
            <hr></hr>
            <div className='my-4'>
                <div className='flex flex-wrap gap-2.5 border my-3 rounded-lg p-3'>
                    <div className={music?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setMusic(prev=>!prev);
                                if(hobbies.includes("🎵 Listening to music")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🎵 Listening to music"))
                                } else{
                                    !music&&setHobbies([...hobbies, "🎵 Listening to music"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🎵 {t('Listening to music')}</span>
                    </div>
                    <div className={reading?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setReading(prev=>!prev);
                                if(hobbies.includes("📖 Reading")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "📖 Reading"))
                                } else{
                                    !reading&&setHobbies([...hobbies, "📖 Reading"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>📖 {t('Reading')}</span>
                    </div>
                    <div className={travelling?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setTravelling(prev=>!prev);
                                if(hobbies.includes("🌍 Travelling")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🌍 Travelling"))
                                } else{
                                    !travelling&&setHobbies([...hobbies, "🌍 Travelling"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🌍 {t('Travelling')}</span>
                    </div>
                    <div className={movies?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setMovies(prev=>!prev);
                                if(hobbies.includes("🎥 Watch Movies")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🎥 Watch Movies"))
                                } else{
                                    !movies&&setHobbies([...hobbies, "🎥 Watch Movies"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🎥 {t('Watch Movies')}</span>
                    </div>
                    <div className={cooking?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setCooking(prev=>!prev);
                                if(hobbies.includes("🍳 Cooking")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🍳 Cooking"))
                                } else{
                                    !cooking&&setHobbies([...hobbies, "🍳 Cooking"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🍳 {t('Cooking')}</span>
                    </div>
                    <div className={art?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setArt(prev=>!prev);
                                if(hobbies.includes("🎨 Art")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🎨 Art"))
                                } else{
                                    !art&&setHobbies([...hobbies, "🎨 Art"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🎨 {t('Art')}</span>
                    </div>
                    <div className={swimming?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setSwimming(prev=>!prev);
                                if(hobbies.includes("🏊‍♀️ Swimming")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🏊‍♀️ Swimming"))
                                } else{
                                    !swimming&&setHobbies([...hobbies, "🏊‍♀️ Swimming"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🏊‍♀️ {t('Swimming')}</span>
                    </div>
                    <div className={eating?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setEating(prev=>!prev);
                                if(hobbies.includes("🍕 Eating")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🍕 Eating"))
                                } else{
                                    !eating&&setHobbies([...hobbies, "🍕 Eating"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🍕 {t('Eating')}</span>
                    </div>
                    <div className={dance?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setDance(prev=>!prev);
                                if(hobbies.includes("🕺 Dance")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🕺 Dance"))
                                } else{
                                    !dance&&setHobbies([...hobbies, "🕺 Dance"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🕺 {t('Dance')}</span>
                    </div>
                    <div className={singing?"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-indigo-100 text-indigo-500 cursor-pointer hover:brightness-95":"flex items-center text-lg py-2 px-3 rounded-3xl w-fit border bg-slate-100 cursor-pointer hover:brightness-95"}
                            onClick={()=>{
                                setSinging(prev=>!prev);
                                if(hobbies.includes("🎤 Singing")){
                                    setHobbies(hobbies.filter(hobby=> hobby !== "🎤 Singing"))
                                } else{
                                    !singing&&setHobbies([...hobbies, "🎤 Singing"]);
                                }
                                
                                console.log(hobbies)
                            }}>
                        <span>🎤 {t('Singing')}</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2.5 border my-3 rounded-lg p-3'>
                    {hobbies.map((hobby, index)=>{
                        return (
                            <div key={index} className='flex h-fit items-center text-base py-2 px-3 rounded-3xl w-fit border bg-indigo-300 text-white'>
                                <span>{hobby}</span>
                            </div>)
                    })}
                </div>
                <div className='mx-2 text-lg'>
                    <button  
                            className='text-white bg-indigo-500 p-2 rounded-lg m-2 hover:brightness-95'
                            onClick={()=>{
                                hobbiesHandler()
                            }}
                            >{t('save')}</button>
                    <button className=' dark:text-slate-100 dark:bg-zinc-500 dark:hover:brightness-95 hover:bg-slate-200 p-2 rounded-lg m-2'
                            onClick={()=>setShowHobbies(false)}
                    >{t('cancel')}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Hobbies