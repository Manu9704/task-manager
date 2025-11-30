import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import TaskForm from './pages/TaskForm'
import { AuthContext } from './contexts/AuthContext';
import './App.css';

function Protected({children}) {
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />
}

function App() {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Protected><Dashboard/></Protected>} />
      <Route path='/add-task' element={<Protected><TaskForm/></Protected>} />
      <Route path='/edit-task/:id' element={<Protected><TaskForm/></Protected>} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
