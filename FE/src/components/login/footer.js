import React from 'react';

const Footer = ( ) => {
    return (
        <div className='bg-white my-16 text-xl grid lg:grid-cols-3 items-center'>
            <div className='py-4 text-center'>
                <p className='p-4 underline underline-offset-2'>Contact Us:</p>
                <p className='pl-4 text-lg'><a href='https://www.linkedin.com/in/mohamedk98/' target={"_blank"}>Mohamed Khaled</a></p>
                <p className='pl-4 text-lg'><a href='https://www.linkedin.com/in/abdelhameed-sayed-490545202' target={"_blank"}>AbdelHameed Sayed</a></p>
                <p className='pl-4 text-lg'><a href='https://www.linkedin.com/in/rana-ahmed-k/' target={"_blank"}>Rana Ahmed</a></p>
                <p className='pl-4 text-lg'><a href='https://www.linkedin.com/in/ali-maher-84199823b' target={"_blank"}>Ali Maher</a></p>
                <p className='pl-4 text-lg'><a href='https://www.linkedin.com/in/sarah-ahmed-s/' target={"_blank"}>Sara Ahmed</a></p>
            </div>
            <div  className=''>
                <div className='flex justify-around'>
                    <p className='hover:cursor-pointer m-4'>English</p>
                    <p className='hover:cursor-pointer m-4'>عربي</p>
                </div>
            </div>
            <div className=''>
                <div className='my-4'>
                    <p className='text-center'>Made by <span className='text-red-500'>&hearts;</span> RASMA Team &copy; 2022</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;