import React, { useEffect, useRef, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';

const LoginCard = () => {
const [userInfo, setUserInfo] = useRecoilState(userInfoAtom)  
  // variables
const usernameRef = useRef(null);
const passwordRef = useRef(null);   

  // functions
  const onSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value
    }
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      if (data?.message === "successfully logined"){
        localStorage.setItem("userStatus", true);
        setUserInfo(true);
      }else{
        localStorage.setItem("userStatus", false);
      }
    }).catch((error) => {
      console.log("Error", error)
    })
  };
 
  

  return (
    <div>
        <div className='login-card-container'>
            <div>
                <h1 className='login-heading'>TodoX</h1>
            </div>
            <form onSubmit={onSubmit}>
                <input className='login-inputs' type="text" placeholder="username" 
                ref = {usernameRef} />
                <input className='login-inputs' type="text" placeholder="password"
                ref = {passwordRef} />
                
                <button className='login-button' type="submit">Login</button>
                
                
            </form>
            
        </div>
    </div>
  )
}

export default LoginCard;