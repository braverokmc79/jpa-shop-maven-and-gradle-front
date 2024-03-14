let backendHost;

const hostname =window && window.location && window.location.hostname;


if(hostname==="localhost"){
   backendHost="http://localhost:5000";
   //backendHost="http://mcaronics-todo-api-service.ap-northeast-2.elasticbeanstalk.com";
   //backendHost="https://ma7server.p-e.kr";
   //backendHost="http://macaronics.iptime.org:5000"
}else{
  backendHost="https://ma7server.p-e.kr";
}


export const API_BASE_URL = backendHost;