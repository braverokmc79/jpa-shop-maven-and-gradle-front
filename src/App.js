import "./App.css";
import Todo from "./components/Todo";
import {  useEffect, useState } from "react";
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from "@mui/material";
import AddTodo from "./components/AddTodo";
import {call, signout} from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    call("/api/todo", "GET", null).then((res) => {
      console.log("1.데이터 목록 불러오기 " ,res);
      if(res==="invalid"){  
        window.location.href="/login";
      }else{
        if(res&& res.data){
          console.log("2.데이터 목록 불러오기 " ,res.data);
          setItems(res.data)
          setLoading(false);  
        }
      }
      
    });

    
 },[]);

  const addItem = (item) => {
    call("/api/todo", "POST", item).then(res=>setItems(res.data));
    
  };

  const deleteItem = (item) => {
    call("/api/todo", "DELETE", item).then(res=>setItems(res.data));
  };

 const editItem=(item)=>{
    console.log(item);
    if(item){
      call("/api/todo", "PUT", item).then(res=>{
        if(res && res.data){
          setItems(res.data)}
        } 
      );
    }
};


let todoItems = items && items.length > 0 && (
  <Paper style={{ margin: 16 }}>
    <List>
      {items.map((item) => {
        return (
          <Todo
            key={item.todoId}
            inputItem={item}              
            editItem={editItem}
            deleteItem={deleteItem}
          />
        );
      })}
    </List>
  </Paper>
);


 //navigationBar 추가
 let navigationBar =(
  <AppBar postion="static"  style={{ marginBottom: 300 }}>
     <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          
          <Grid item>
              <Button color="inherit"  onClick={signout}>
  
                로그아웃
              </Button>
          </Grid>             

        </Grid>
     </Toolbar>
  </AppBar>
);



  // 로딩중이 아닐 때 랜더링할 부분
  let todoListPage=(
    <>
    {navigationBar}
      
    <Container maxWidth="md" style={{top:70, position:"relative"}}>  
      <AddTodo addItem={addItem} />
      <div className="TodoList">{todoItems}</div>
    </Container>
    </>
  )

  //로딩중리 때 래더링할 부분
  let loadingPage=<h1>로딩중....</h1>
  let content=loadingPage;

  if(!loading){
      // 로딩중이 아니라면 todoListPage 를 선택
      content=todoListPage;
  }
 

    return (
      <div className="App">
        {content}
      </div>
    );
}

export default App;
