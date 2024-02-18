import React from "react";
import { Navigate } from "react-router-dom";



const SocialLogin = (props) => {
  
    const getUrlParameter = (name) => {
    console.log("토큰 파싱" );
    //쿼리 파라미터에서 값을 추출하는 합수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };


  const token=getUrlParameter("token");
  console.log("토큰 파싱" , token);
  let template = "";

  if(token){
    //로컬 스토리지에 토큰 저장
    console.log("컬 스토리지에 토큰 저장 :",token);
    //로컬 스토리지에 토큰 저장
    localStorage.setItem("ACCESS_TOKEN", token);

    template=<Navigate to={ {pathname:"/", state:{from:props.location}} } />

  }else{
   // template=<Navigate to={ {pathname:"/login", state:{from:props.location}} } />
  }

  return <>
        {template}
    </>

};

export default SocialLogin;
