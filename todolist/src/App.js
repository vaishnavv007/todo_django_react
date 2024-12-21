import { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
//components
import Login from "./pages/Login";
import Home from "./pages/Home";
//recoil js
import { useRecoilState } from "recoil";
import userInfoAtom from "./recoil/userInfoAtom";


function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  useEffect(() => {
    if (localStorage.getItem("userStatus")?.includes("true")){
      setUserInfo(true);
    }else{
      setUserInfo(false);
    }
  }, [localStorage.getItem("userStatus")]) 
  return (
    <div >
      <Routes>
        <Route path="/" element={userInfo === true ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={userInfo === false ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
