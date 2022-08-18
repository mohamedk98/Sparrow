import React, { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { BsFillGridFill } from 'react-icons/bs';
import { RiEqualizerLine } from 'react-icons/ri';
import { AiTwotoneSetting } from 'react-icons/ai';
import { t } from 'i18next';

function PostView() {
    const [listView, setListView] = useState(true);
    const [gridtView, setGridtView] = useState(false)
    return (
        <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl w-full shadow-md">
            <div className="grid grid-cols-2 gap-2.5 items-center">
                <div className="text-xl font-bold">
                    {t('Posts')}
                </div>
                <div className="flex gap-2.5 lg:ml-8">
                    <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-3 cursor-pointer hover:brightness-95">
                        <RiEqualizerLine className="inline w-5 h-5" />
                        <span className="font-semibold ml-1">{t('Filters')}</span>
                    </div>
                    <div className="bg-slate-200 dark:bg-zinc-700 rounded-lg p-3 cursor-pointer hover:brightness-95">
                        <AiTwotoneSetting className="inline w-5 h-5" />
                        <span className="font-semibold ml-1">{t('Manage posts')}</span>
                    </div>
                </div>
            </div>
            <hr className="my-3"></hr>
            <div className="flex justify-around my-0.5">
                <div className="text-gray-600 dark:text-gray-400 dark:hover:bg-zinc-700 font-semibold rounded-lg py-1 px-4 cursor-pointer hover:bg-slate-100"

                >
                    <BsList className="inline mx-2 text-xl"/>
                    {t('List view')}
                </div>
                <div className="text-gray-600 dark:text-gray-400 dark:hover:bg-zinc-700 font-semibold rounded-lg py-1 px-4 cursor-pointer hover:bg-slate-100"
                    onClick={()=>setGridtView(true)}
                >
                    <BsFillGridFill className="inline mx-2 text-xl"/>
                   {t('Grid view')}
                </div>
            </div>
        </div>
    )
}

export default PostView