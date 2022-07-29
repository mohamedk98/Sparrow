import React,{useState} from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';

const UploadPhoto = ({setShowUploadPic,selectedImages,setSelectedImages}) => {
  
    const [imgType,setImgType]=useState('');

    //To Upload Multi Photo
    const selectedFileHandler=(e)=>{
        const selectedFiles=e.target.files;
        if(!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)){
            setImgType('Please select a valid Image');
       
        }
        else{
            setImgType('');
        
        
            const selectedFilesArray=Array.from(selectedFiles);
            // console.log(selectedFilesArray);
            const imageArray=selectedFilesArray.map((file)=>{
                //To create a url string of the uploaded image
                return URL.createObjectURL(file);
            });
            // console.log(imageArray);
            setSelectedImages((prevImg)=>prevImg.concat(imageArray));
        }
    } 

    //To delete all selected photos if he close the selectPhoto Btn
    const closeAddPhoto=()=>{
        setShowUploadPic(false);
        if(selectedImages.length!==0){
            setSelectedImages(selectedImages.length=0)
            console.log(selectedImages);
        }
    }
 
  return (
    <div className="flex justify-center w-full mt-8">
    <div className="rounded-lg bg-gray-50 lg:w-full">
    <button onClick={closeAddPhoto}>
    <AiFillCloseCircle className='text-4xl p-1 border-none rounded-none cursor-pointer hover:text-black hover:opacity-75'/>
    </button>
        <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
                Add Image(jpg,png,gif,jpeg)
                <span className='text-red-700'> {imgType}</span>
            </label>
                
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo , up to 5 photos</p>
                    </div>
            
                  
                    <input type="file" 
                    name='media'
                    multiple
                    accept='image/jpg, image/png, image/gif, image/jpeg' 
                    onChange={selectedFileHandler} 
                    className="opacity-0" />
                      
                </label>
    
         </div>
        </div>
        {selectedImages.length>0 && 
        (selectedImages.length>5?
            (<p className='text-red-700 text-center'>You can't upload more than 5 photos in a post
             <br/>
             <span>Please delete <b>{selectedImages.length-5}</b> of them</span>            
            </p>)
            :
            '')}
     <div className='flex w-full'>
     {
                
                selectedImages&&selectedImages.map((image,index)=>(
                                <div key={image} className='flex flex-row flex-wrap justify-center items-center'>
                                    <img src={image} alt='selectedPhoto' className='h-20'/>
                                    <button 
                                    className='h-5 text-white bg-red-700 rounded'
                                    onClick={()=>
                                    setSelectedImages(selectedImages.filter((e)=>e!==image))
                                    }>Delete image</button>
                                    
                                </div>
                            ))
            }
     </div>
    </div>
</div>
  )
}

export default UploadPhoto;