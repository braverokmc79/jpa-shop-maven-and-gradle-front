import { Checkbox, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

const Todo = ({porpItem, deleteItem, editItem}) => {
  const [item, setItem] = useState(porpItem);
  const [readOnly, setReadOnly] = useState(false);


  const turnOffReadonly =(e)=>{
    if(e.key==="Enter" && readOnly ===false){
      setReadOnly(true);
      editItem(item);
    }
  }

  const editEventHandler = (e) =>{
    setItem({...item, title:e.target.value});
  }


  const checkBoxEventHandler = (e) =>{
    item.done=e.target.checked;
    editItem(item);
  }


  return (
    <ListItem  style={{background:!readOnly ?  '#eee': '#fff'  }} >
        <Checkbox checked={item.done}   onChange={checkBoxEventHandler} />
        <ListItemText>
            <InputBase
                inputProps={{"aria-label" : "naked", readOnly: readOnly }}
                onClick={turnOffReadonly}
                onKeyDown={turnOffReadonly}
                onChange={editEventHandler}
                type="text"
                id={item.id}
                name={item.id}
                value={item.title}
                multiline={true}
                fullWidth={true}
                
            />      
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton aria-label='Delete Todo'  onClick={(e)=>deleteItem(item)}>
              <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
    
  )
}

export default Todo