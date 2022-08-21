import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { axiosInstance } from '../../network/axiosInstance';
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';

const password_regex=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema=yup.object({
    fullName:yup.string().min(3,"Please enter your full name").required("Full name is required!"),
    email:yup.string().email("Please enter a valid email address").required(),
    password:yup.string().matches(password_regex,"Please enter a strong password").required(),
    confirmPass:yup.string().required("Please confirm your password")
    .when("password",{
        //if confirmPass == to password
        is:val=>(val && val.length > 0?true:false),
        //after checking
        then:yup.string().oneOf([yup.ref("password")],"Password does not match")
    }),
});

const SignUpForm = () => {
    const [success,setSuccess]=useState(null);
    const [error,setError]=useState(null);
    const [showPass,setShowPass]=useState(false);
    const [showConfirmPass,setShowConfirmPass]=useState(false);
     
    const onSubmit=(values)=>{
        const {confirmPass,...data}=values;
        axiosInstance.post('/admin/create-admin',data,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            //if response is valid
            setError(null);
            setSuccess(res.data);
            formik.resetForm()
        })
        .catch((err)=>{
            if(err && err.response){
                setError(err.response.data);
                setSuccess(null);
            }

        });
         
    };

    const formik=useFormik({
        initialValues:{fullName:"",email:"",password:"",confirmPass:""},
        validateOnBlur:true,
        onSubmit,
        validationSchema:validationSchema
        
    });
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-2 text-3xl text-center text-indigo-500">Add New Admin</h1>
                {!error && success ? <p className='mb-6 font-bold text-green-600 text-sm text-center'>{success}</p>:""}
                {!success && error? <p className='mb-6 font-bold text-sm text-center text-red-500'>{error}</p>:""}
                <form onSubmit={formik.handleSubmit}>
                <input 
                    type="text"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block border border-grey-light w-full p-3 rounded "
                    name="fullName"
                    placeholder="Full Name" />
                <span className='flex text-red-500 text-sm w-full mb-4'>
                    {formik.touched.fullName && formik.errors.fullName? formik.errors.fullName:""}
                 </span>

                <input 
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block border border-grey-light w-full p-3 rounded "
                    name="email"
                    placeholder="Email" />
                <span className='flex text-red-500 text-sm w-full mb-4'>
                 {formik.touched.email && formik.errors.email? formik.errors.email:""}
                </span>

            <div className='relative w-full'>
                <input 
                    type={showPass?"text":"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block border border-grey-light w-full p-3 rounded "
                    name="password"
                    placeholder="Password" />
                {formik.values.password?
                  <div className='text-2xl absolute top-4 right-5' onClick={()=>setShowPass(!showPass)}>
                    {showPass?<AiFillEye/>:<AiFillEyeInvisible/>}
                   
                  </div>:""
                }
                    <span className='flex text-red-500 text-sm w-full mb-4'>
                    {formik.touched.password && formik.errors.password? formik.errors.password:""}
                   </span>
            </div>

            <div className='relative w-full'>
                <input 
                    type={showConfirmPass?"text":"password"}
                    value={formik.values.confirmPass}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block border border-grey-light w-full p-3 rounded"
                    name="confirmPass"
                    placeholder="Confirm Password" />
                    {formik.values.confirmPass?
                      <div className='text-2xl absolute top-4 right-5'  onClick={()=>setShowConfirmPass(!showConfirmPass)}>
                        {showConfirmPass?<AiFillEye/>:<AiFillEyeInvisible/>}
                       </div>
                      :""
                    }
             
                     <span className='flex text-red-500 text-sm w-full mb-4'>
                     {formik.touched.confirmPass && formik.errors.confirmPass? formik.errors.confirmPass:""}
                    </span>
              </div>

                <button
                    disabled={!formik.isValid}
                    type="submit"
                    className={ `${!formik.isValid?'opacity-50':'opacity-100'} w-full text-center py-3 rounded bg-indigo-500 text-white hover:bg-green-dark focus:outline-none my-1`}
                >Add 
                </button>
                </form>
    
            </div>

        </div>
    </div>
    );
}

export default SignUpForm;
