import React from 'react';
import { useSelector } from 'react-redux';

function Photos() {
    const userState = useSelector(state =>state.userData.userData);
    return (
        <div className="mt-3 bg-slate-200 dark:bg-darkBgColor  shadow-md">
            <div className="w-11/12 m-auto">
                <div className="py-2.5 px-9">
                    <div className="grid grid-col-1">
                        <div className="lg:w-5/6 w-full mt-3 xl:ml-20 lg:ml-14">
                            <div className="bg-white dark:bg-darkBgSideBar dark:text-white my-3 p-4 rounded-xl">
                                <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                                    Photos
                                </div>
                                <div className='grid grid-cols-4 gap-2.5 m-5'>
                                {userState?.gallery?.map((photo, index)=>{
                                    return(
                                        <img key={index} src={photo} alt="photos" className="border rounded-md"></img>
                                    )
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Photos;