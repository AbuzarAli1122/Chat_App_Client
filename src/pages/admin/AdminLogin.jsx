import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { adminlogin, getAdmin } from '../../redux/thunks/admin';
import { useEffect } from 'react';


const AdminLogin = () => {

  const dispatch = useDispatch();
  const {isAdmin} = useSelector(state => state.auth)
  const secretKey = useInputValidation('')

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminlogin(secretKey.value))
  };

  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])

  if(isAdmin) return <Navigate to='/admin/dashboard'/> ;



  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient( rgba(200, 200, 200, 0.5), rgba(120, 120, 120, 0.5) )',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <Typography variant="h5">Admin Login</Typography>

          <form onSubmit={submitHandler}>
           
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: '1rem' }}
            >
              Login
            </Button>

           
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
