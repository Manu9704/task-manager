import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import AppPagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import API from '../api/axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Dashboard() {
    const {user} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [pageData, setPageData] = useState({page:1, totalPages:1});
    const { show } = useContext(NotificationContext)
    const navigate = useNavigate();

    const fetchTasks = async (page=1) => {
        try {
            const res = await API.get(`/tasks/getAllTasks?page=${page}&limit=9`)
            setTasks(res.data.tasks || []);
            setPageData({page: res.data.page || 1, totalPages: res.data.totalPages || 1});
        } catch (err) {
            show(err.response?.data?.message || 'Unable to fetch tasks');
        }
    }

    useEffect(()=>{
        fetchTasks()
    },[]);

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this task?')) return;
        try {
            await API.delete(`/tasks/deleteTask/${id}`)
            fetchTasks(pageData.page)
        } catch (err) {
            show(err.response?.data?.message || 'Delete Failed')
        }
    }

    return(
        <>
            <Header/>
            <Container sx={{mt:3}}>
            <Box display='flex' justifyContent='space-between' alignItems='center' mb={6}>
                <Typography variant='h5'>Tasks</Typography>
                    <Button variant='contained' onClick={()=>navigate('/add-task')}>Add Tasks</Button>
            </Box>

            <Grid container spacing={3} mb={5} xs={12}>
                {tasks.length === 0 ? <Grid item xs={12}><Typography>No Tasks yet</Typography></Grid> : tasks.map(t => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={t._id}>
                    <TaskCard task={t} onEdit={()=>navigate(`/edit-task/${t._id}`)} onDelete={user?.role === 'admin' ? () => handleDelete(t._id) : null}/>
                    </Grid>
                ))}
            </Grid>
            <Box mb={3}><AppPagination page={pageData.page} totalPages={pageData.totalPages} onChange={fetchTasks}/></Box>
        </Container>
        </>
    )
}