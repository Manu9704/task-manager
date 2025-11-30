import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';

export default function TaskCard({task, onEdit, onDelete}) {
    const truncate = (text, limit) => {
        if(!text) return "";
        if (text.length <= limit) return text;
        return text.slice(0,limit).trim() + "..."
     };

    return (
        <motion.div whileHover={{ y: -8 }} style={{width: '100%'}}>
        <Card className='lavish-card' sx={{ display: 'flex', flexDirection: 'column'}}>
            <div className='accent-strip'/>
            <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" component="div" className="text-fixed ellipsis-1" sx={{ fontWeight: 600 }}>
              {truncate(task.title,20) || 'Untitled'}
            </Typography>
            <Chip label={task.status} color={task.status === 'Completed' ? 'success' : 'default'} />
            </Box>
            <Typography variant="body2" color="text.secondary" className="text-fixed ellipsis-2" sx={{ mt: 1 }}>
            {task.description || 'No description'}
            </Typography>            
             <Box sx={{ flex: '1 1 auto' }} />

               <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                 <Box display="flex" alignItems="center" gap={1}>
                   <Avatar sx={{ width: 34, height: 34 }}>{task.createdBy?.name?.[0]?.toUpperCase() ?? 'U'}</Avatar>
                   <Typography variant="caption" color="text.secondary">
                     {new Date(task.createdAt).toLocaleDateString()}
                   </Typography>
                 </Box>

              <Box>
              <Button size="small" onClick={() => onEdit && onEdit(task)}>Edit</Button>
              {onDelete && <Button size="small" color="error" onClick={() => onDelete(task)}>Delete</Button>}
              </Box>
              </Box>
            </CardContent>
            
        </Card>
        </motion.div>
    )
}