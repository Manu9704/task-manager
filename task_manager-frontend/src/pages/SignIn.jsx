import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../contexts/NotificationContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email('Enter valid email').required('Email required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password Required'),
}).required();

export default function SignIn(){
  const { signIn } = useContext(AuthContext);
  const { show } = useContext(NotificationContext)
  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors, isSubmiting}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data);
      signIn(res.data.token, res.data.user);
      show('Signed In', 'Success')
      navigate('/');
    } catch (err) {
      show(err.response?.data?.message || 'Signin failed');
  }
};
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gap:2 }}>
           <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
          <Box sx={{ display:'flex', gap:2, alignItems:'center' }}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmiting}>
              {isSubmiting ? 'Signing...' : 'Sign In'}
            </Button>
            <Link href="/signup" variant="body2">Create account</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
