import { t } from 'i18next';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

function ConfirmUnfriendSingle({setUnfriend, removeFriend, friend}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto">
            <div className="lg:w-2/5 w-4/5 mx-auto my-32 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-500">
                <div className="relative mb-8">
                    <button className="absolute right-2 top-0 text-2xl rounded-lg hover:bg-slate-200"  
                        onClick={() => {
                            setUnfriend(false);
                            }}>
                        <AiOutlineClose/>
                    </button>
                </div>
                <div className="mt-3">
                    <span className='m-2 p-2 text-lg font-semibold'>{t('Are you sure you want to unfriend this person')}{t('input_questionMark')}</span>
                    <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                        <div className="bg-indigo-500 dark:bg-indigo-500 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                            <button type='submit' className="font-semibold ml-1" onClick={(e)=>{
                                removeFriend(friend._id);
                                setUnfriend(false)
                            }}>{t('Unfriend')}</button>
                        </div>
                        <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                            <button onClick={()=>{
                                setUnfriend(false)
                                }}
                                className="font-semibold ml-1"
                                >{t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmUnfriendSingle