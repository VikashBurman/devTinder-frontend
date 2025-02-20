import {  Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
// import Footer from "./Footer";



const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async()=>{
    try {
      const user = await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true
      });
      // console.log(user.data);
      dispatch(addUser(user.data));
    } catch (error) {
      if(error.status == 401){
        navigate("/login");
      }
      console.error(error);
    }
  }
  
  useEffect(()=>{
    fetchUser();
  },[]);
  return (
    <>
      <NavBar />
      <Outlet/>
      {/* <Footer/> */}
    </>
  );
};

export default Body;
