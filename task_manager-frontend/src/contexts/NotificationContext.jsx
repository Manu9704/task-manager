import React, {createContext, useState}  from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [notif, setNotif] = useState({open: false, message:'', severity:'info'});

    const show = (message, severity='info', options={}) => {
        setNotif({open:true, message, severity, ...options})
    };

    const handleClose = () => setNotif(n => (n => ({...n, open:false})))

    return(
        <NotificationContext.Provider value={{show}}>
            {children}
            <Snackbar open={notif.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                <Alert onClose={handleClose} severity={notif.severity} sx={{width:'100%'}}>{notif.message}</Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}