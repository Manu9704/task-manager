import React from "react";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function AppPagination({page, totalPages, onChange}){
    if(!totalPages || totalPages <= 1) return null;
    return(
        <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
            <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => onChange(val)}
            color="primary"
            />
        </Box>
    )
}