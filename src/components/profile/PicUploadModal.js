import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { GiWoodFrame } from 'react-icons/gi';
import UpdateProfilePic from './UpdateProfilePic';


function PicUploadModal({setChoosePic}) {
    const [pic, setPic] = useState("")
    const [error, setError] = useState("");
    const refInput = useRef(null)
    const handleImage = (e) =>{
        let file = e.target.files[0];
        if(
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"){
                setError(`${file.name} format is not supported`);
            //setShowCoverMenu(false);
                return;
        } else if(file.size > 1024 * 1024 * 5){
            setError(`${file.name} is too large`);
          //setShowCoverMenu(false);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setPic(event.target.result)
        }
        //setShowCoverMenu(false);
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto'>
            <div className='w-2/4 mx-auto my-32 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white'>
                <div className='relative mb-3'>
                    <div className='text-center text-xl'>Update Picture</div>
                    <button className='absolute right-2 top-0 text-xl'>
                        <AiOutlineClose onClick={()=>{setChoosePic(false)}}/>
                    </button>
                </div>
                <hr></hr>
                <div className='mt-3'>
                    <input type="file" ref={refInput}
                    accept='image/jpeg,image/png,image/webp,image/gif'
                    hidden onChange={handleImage}/>
                </div>
                <div className='flex gap-3 my-3'>
                    <div className="bg-blue-100 text-blue-500 text-center w-2/4 rounded-lg p-3">
                        <AiOutlinePlus className="inline w-5 h-5" />
                        <span className="font-semibold ml-1 cursor-pointer" onClick={()=>refInput.current.click()}>Upload Photo</span>
                    </div>
                    {pic&&<UpdateProfilePic pic={pic} setPic={setPic}/>}
                    <div className="bg-slate-200 text-center w-2/4 rounded-lg p-3">
                        <GiWoodFrame className="inline w-5 h-5" />
                        <span className="font-semibold ml-1">Add Frame</span>
                    </div>
                </div>
                <div>
                    {error&&<div className='text-center text-red-600'>{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default PicUploadModal;