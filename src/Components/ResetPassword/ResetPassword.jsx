import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function ResetPassword() {
const navigate=useNavigate();
 async function resetPass(values){
    let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values); 
    console.log(data);
    if(data.token){
        navigate('/login');
    }
  }
    const newPassFormik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        onSubmit:resetPass
    });
  return <>
    <div >
        <form onSubmit={newPassFormik.handleSubmit} className='w-75 my-5 m-auto'>
            <label>email:</label>
            <input type='email' onChange={newPassFormik.handleChange} onBlur={newPassFormik.handleBlur} value={newPassFormik.values.email} className='form-control' id='email'/>

            <label>New Password:</label>
            <input type='password' onChange={newPassFormik.handleChange} onBlur={newPassFormik.handleBlur} value={newPassFormik.values.newPassword} className='form-control' id='newPassword'/>

            <button type='submit' className='btn btn-outline-success my-3'>Reset Password</button>
        </form>
    </div>
  </>
}