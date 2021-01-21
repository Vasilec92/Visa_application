import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function App() {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([]);
  const [parent, setParent] = useState({firstName: '', lastName: '', address : '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent", parent);
    console.log("Children", inputFields);
  };

  const handleChangeParent = (event)=>{
    
    const values = {...parent}
    values[event.target.name]=event.target.value
    setParent(values)
  }


  const handleChangeInput = (idx, event) => {    
    const values = [...inputFields]
    values[idx][event.target.name]=event.target.value
    setInputFields(values)
  }

  const addChildren = () => {
    setInputFields([...inputFields, { firstName: '', lastName: '', age: 0, address:parent.address }])
  }

  const removeChild = idx => {
    const values = inputFields.filter((el,index)=> (index!==idx))  
    setInputFields(values);
  }

  

  return (
    <Container>
      <h1 style={{textAlign: "center"}}>VISA Application</h1>
      <Grid container justify = "center">
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              name="firstName"
              label="First Name"
              variant="filled"
              value={parent.firstName}
              onChange={event => handleChangeParent(event)}
            />
            <TextField
              required
              name="lastName"
              label="Last Name"
              variant="filled"
              value={parent.lastName}
              onChange={event => handleChangeParent(event)}
            />
            <TextField
              required
              name="address"
              label="Address"
              variant="filled"
              value={parent.address}
              onChange={event => handleChangeParent(event)}
            />
          </Grid>
            <Grid item xs={12}>
              <Button
              className={classes.button}
              variant="contained" 
              color="primary"          
              onClick={addChildren}>
              Add Children</Button>
            </Grid>
            

        { inputFields.map((inputField,idx)=> (
          <div key={idx}>
            <TextField
              name="firstName"
              label="First Name"
              variant="filled"
              value={inputField.firstName}
              onChange={event => handleChangeInput(idx, event)}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="filled"
              value={inputField.lastName}
              onChange={event => handleChangeInput(idx, event)}
            />
              <TextField
              name="age"
              type="number"
              label="Age"
              variant="filled"
              value={inputField.age}
              onChange={event => handleChangeInput(idx, event)}
            />
            <TextField
              name="address"
              label="Address"
              variant="filled"
              value={inputField.address}
              onChange={event => handleChangeInput(idx, event)}
            />
            <IconButton  onClick={() => removeChild(idx)}>
              <RemoveIcon />
            </IconButton>
            
          </div>
        )) }
        <Grid item xs={12} style={{textAlign: "center"}} >
          <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit"          
          onClick={handleSubmit}
        >Send</Button>
        </Grid>        
      </form>
      </Grid>
      
    </Container>
  );
}

export default App;
