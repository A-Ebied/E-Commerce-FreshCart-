import React from "react";
import Style from "./Footer.module.css";
export default function Footer() {
  return (
    <>
       <footer className='footer-bg py-4 mt-auto bg-light'>
      <div className='container'>
      <h2>Get The FreshCart App</h2>
      <p>We Will Send You a Link,open it on your phone to download the app</p>
      <form className='d-flex'>
      <input placeholder='Enter..' type='text' className='form-control w-75' />
      <button type='submit' className='btn btn-success ms-2'>Share App Link</button>
      </form>
      <div className='row border border-1 border-start-0 border-end-0 mt-4 cursor-pointer'>
        <div className='col'>
          <div className='d-flex align-items-center py-2'>
            <p>Payment Partners</p>
            <img src={require('../../Assets/images/6.Amazon_Pay-Logo-2412x652-1.png')} className='mb-1 ms-3' style={{width:'80px' ,height:'40px'}}/>
            <img src={require('../../Assets/images/business-gold.webp')} className='mb-1 ms-3' style={{width:'80px' ,height:'40px'}}/>
            <img src={require('../../Assets/images/Google_Play_Store_badge_EN.svg.webp')} className='mb-1 ms-3' style={{width:'80px' ,height:'40px'}}/>
            <img src={require('../../Assets/images/MasterCard_Logo.svg.webp')} className='mb-1 ms-3' style={{width:'80px' ,height:'40px'}}/>
          </div>
        </div>
        <div className='col'>
        <div className='d-flex align-items-center'>
          <p className='p-0 m-0'>Get deliveries with FreshCart</p>
          <img src={require('../../Assets/images/download-now-button_5e123a6c6ddf0.png')} className='mb-1 ms-3' style={{width:'110px' ,height:'60px'}}/>
          <img src={require('../../Assets/images/MasterCard_Logo.svg.webp')} className='mb-1 ms-3' style={{width:'100px' ,height:'50px'}}/>
         </div>
        </div>
      </div>
      </div>
    </footer>
    </>
  );
}
