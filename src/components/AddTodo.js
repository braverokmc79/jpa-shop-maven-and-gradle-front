import React, { useCallback, useEffect, useState } from 'react'
import { Grid, ListItem, TextField } from '@mui/material';
import { Button } from '@mui/base';

const AddTodo = ({addItem}) => {
  const [item, setItem] = useState({title:""});
  

 
  useEffect(() => {
    
  }, [item]);

  const onButtonClick =()=>{
    addItem(item);
    setItem({title:""});
  }


  const onInputChange = useCallback((e)=>{
    setItem({[e.target.name]:e.target.value});
    // console.log(item);
  }, [item]);


  const enterKyEventHandler=(e) => {
      if(e.key==="Enter"){
        onButtonClick();
      }
  };


  return (
    <Grid container style={{margin:20}}>
        <Grid xs={11} item style={{paddingRight:16}} >
            <TextField placeholder="Add Todo here" fullWidth name="title" onChange={onInputChange}  value={item.title}              
              onKeyPress={enterKyEventHandler} 
            />
        </Grid>
        <Grid xs={1} md={1}       item  >
            <Button  style={{height:'100%'}}  color='secondary' variant="outlined" onClick={onButtonClick} >
                +    
            </Button>            
        </Grid>

    </Grid>
  )
}

export default AddTodo