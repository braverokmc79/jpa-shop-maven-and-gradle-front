
import {API_BASE_URL} from '../api-config';

export function call(api, method, request) {
    let headers=new Headers({'Content-Type': 'application/json'}) ;

    //로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken=localStorage.getItem('ACCESS_TOKEN');
    if(accessToken && accessToken !==null){
        headers.append('Authorization', "Bearer "+accessToken);
    }

    let options = 
        {
            headers: headers,
            url:API_BASE_URL+api,
            method:method,
        };
    if(request){
        //GET method
        console.log("call request  : ",request);
        options.body=JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((res)=>{           
            console.log(" successful 1" , res);          
            // if(res.status===403 || res.status===401){
            //      window.location.href ="/login"                    
            // }

            if(res.status===200){
                return res.json();
            }else if(res.status===403 || res.status===401){
                window.location.href ="/login"
                
            }else{
                // Promise.reject(res);
                // throw Error(res);
                return res.json();

            }
           
        }).then(res=>{
            
            try {
                console.log(" successful 2" , res); 
                if(res.error!==null && res.error!==undefined)         {
                    alert(res.error);
                    console.log(" successful res.error" , res.error);  
                
                }else if(res.token){
                    //로컬 스토리지에 토큰 저장
                    localStorage.setItem("ACCESS_TOKEN", res.token);
    
                    //token 이 존재하는 경우 Tdoo 화면으로 리다이렉트
                     window.location.href ="/";                
                }else{
                    return res;
                }
                
            } catch (error) {
               // window.location.href ="/login";  
            }

        }).catch((err)=>{
            console.log(" 에러  :", err);
        });


}


export function signin(UserDTO){
   
    return call("/api/auth/signin", "POST", UserDTO)
        .then((res)=>{
            console.log("response :", res);
            try {
                if(res.error!==undefined && res.error!==null){
                    alert(res.error);      
                    return;
                }                
            } catch (error) {
                console.log("error :", error);
            }
          
            if(res){
                alert("로그인 토큰 : "+ res.token);            
            }
            
        });
}


export function signout(){
    localStorage.setItem("ACCESS_TOKEN",null);
    window.location.href ="/login";
}

export function signup(userDTO){
    return call("/api/auth/signup", "POST", userDTO);
    
}


export default call;

