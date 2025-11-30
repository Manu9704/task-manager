import React , {useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import API from '../api/axios';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { NotificationContext } from '../contexts/NotificationContext';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    title: yup.string().required('Title Required'),
    description: yup.string().optional(),
    status: yup.string().oneOf(['Pending', 'Completed']).required(),
}).required();

export default function TaskForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const { show } = useContext(NotificationContext);

    const {control, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: { title: '', description: '', status: 'Pending' }
    })

    useEffect(()=> {
                if (!id) {
                reset({ title: '', description: '', status: 'Pending' });
                return;
             }
            (async()=>{
                try {
                const res = await API.get(`/tasks/${id}`);
                if (res.data) reset({ title: res.data.title, description: res.data.description || '', status: res.data.status });
              } catch (err) {
                try {
                   const res2 = await API.get(`/tasks/getAllTasks?page=1&limit=1000`);
                   const t = (res2.data.tasks || []).find(x => x._id === id);
                   if (t) reset({ title: t.title, description: t.description || '', status: t.status });
                   else show('Task not found', 'error');
                } catch (err2) {
                   show('Failed to load task', 'error')
                }
            }
            })();
        
    }, [id, reset, show]);

    const onSubmit = async (data) => {
        try {
            if(id) await API.put(`/tasks/edit-task/${id}`, data);
            else await API.post('/tasks/createTask', data);
            show('Saved', 'Success')
            navigate('/');
        } catch (err) {
            show(err?.response?.data?.message || 'Save Failed', 'error')
        }
    };
    return(
        <>
            <Header/>
            <Container maxWidth='md' sx={{mt:3}}>
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}></motion.div>
                <Paper sx={{ p:3, borderRadius: 3, boxShadow: '0 12px 30px rgba(6,18,40,0.36)' }}>
                  <Typography variant="h6" gutterBottom>{ id ? 'Edit Task' : 'Add Task' }</Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gap:2 }}>
                       <Controller name="title" control={control} render={({ field }) => (
                         <TextField {...field} label="Title" variant="outlined" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                         )}/>
                        
                       <Controller name="description" control={control} render={({ field }) => (
                        <TextField {...field} label="Description" variant="outlined" fullWidth multiline rows={4} error={!!errors.description} helperText={errors.description?.message}/>
                        )}/>

                       <Controller name="status" control={control} render={({ field }) => (
                         <TextField select label="Status" {...field} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                           <MenuItem value="Pending">Pending</MenuItem>
                           <MenuItem value="Completed">Completed</MenuItem>
                         </TextField>
                       )} />
                   
                       <Box sx={{ display:'flex', gap:2 }}>
                         <Button type="submit" variant="contained" size="large">{isSubmitting ? 'Saving...' : 'Save Task'}</Button>
                         <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
                       </Box>
                     </Box>
                   </Paper>
                <motion.div></motion.div>
            </Container>
        </>
    )
}