import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Name required'),
    email: yup.string().email('Enter valid email').required('Email required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password Required'),
    role: yup.string().oneOf(['user', 'admin']).required(),
}).required();

export default function SignUp(){
  const { signIn } = useContext(AuthContext);
  const { show } = useContext(NotificationContext)
  const navigate = useNavigate();

  const {register, handleSubmit, control, formState: {errors, isSubmitting}} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {role: 'user'}
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/register', data);
      signIn(res.data.token, res.data.user);
      show('Account created', 'success')
      navigate('/');
    } catch (err) {
      show(err?.response?.data?.message || 'Signup failed', 'error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gap:2 }}>
          <TextField label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
          <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
          <Controller name="role" control={control} render={({ field }) => (
            <Select {...field}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          )} />
          <Box sx={{ display:'flex', gap:2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create account'}
            </Button>
            <Link href="/signin" variant="body2" sx={{ alignSelf:'center' }}>Already have account?</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
