import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';
import addTaskAtom from '../../recoil/addTaskAtom';
import { useEffect } from 'react';


const Header = (props) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  useEffect(() => {
     console.log(addTaskOverlay);
  }, [addTaskOverlay]);
  const navigate = useNavigate();
  return (
    <header>
        <div className='home-header-container'>
            
                <h1 className='home-logo-text'>TodoX</h1>
                    
            <div className='btn-container'>
                <button className='new-task-btn' onClick={() =>{
                  if (addTaskOverlay){
                    setAddTaskOverlay(null)
                  }else {
                    setAddTaskOverlay(true)
                  }
                } }><span><AddRoundedIcon fontSize="large" /></span>{" "} new</button>
                <button className='new-task-btn' onClick={() => {
                  localStorage?.clear();
                  setUserInfo(false);
                  navigate("/login");
                }}>
                  <LogoutRoundedIcon fontSize='large' /></button>
            </div>
        </div>
    </header>
  )
}

export default Header;