import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Users } from './pages/Users';
import { Signup } from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { Me } from './pages/Me';
import { Notfound } from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route exact path='/' element={<Navigate to='/signin' />} />
            <Route path='/users' element={<Users />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/users/me' element={<Me />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
