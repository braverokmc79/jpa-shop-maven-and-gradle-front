import "./App.css";
import Todo from "./components/Todo";
import {  useEffect, useState } from "react";
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from "@mui/material";
import AddTodo from "./components/AddTodo";
import {call, signout} from "./service/ApiService";

function App() {
  const [items, setSetItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    call("/todo", "GET", null).then(res=>{      
      if(res && res.data){
        setSetItems(res.data)
        setLoading(false);
      }} 
    );
    
 },[]);

  const addItem = (item) => {
    // item.id = "ID-" + items.length; //key 를 위한 ID
    // item.done = false; //done 초기화
    //setSetItems([...items, item]);
    //console.log("items : ",items);
    call("/todo", "POST", item).then(res=>setSetItems(res.data));
    
  };

  const deleteItem = (item) => {
    // const newItems = items.filter((e) => e.id !== item.id);
    // setSetItems([...newItems]);
    call("/todo", "DELETE", item).then(res=>setSetItems(res.data));
  };

 const editItem=(item)=>{
    // setSetItems([...items]);
    // console.log("저장 ");
    console.log(item);
    if(item){
      call("/todo", "PUT", item).then(res=>{
        if(res && res.data){
          setSetItems(res.data)}
        } 
      );
    }
};

let todoItems = items.length > 0 && (
    <Paper style={{ marginTop: 16 }}>
      <List>
        {items.map((item) => (
          <Todo porpItem={item} key={item.id} deleteItem={deleteItem}   editItem={editItem} />
        ))}
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
    <div className="App">  {content}   </div>
  );

}

export default App;


