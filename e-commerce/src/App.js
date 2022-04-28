import './App.css';
import NavBar from './components/Navbar/NavBar';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Pages/Home';
import Login from './components/Authenticaiton/Login';
import NotFound from './components/Pages/NotFound';
import OrderList from './components/Pages/OrderList';
import Products from './components/Pages/Products';
import UploadProduct from './components/Pages/UploadProduct';
import RequireAuth from './components/Authenticaiton/RequireAuth';

function App() {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Navigate to='/'/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/order-list' element={
                <RequireAuth>
                    <OrderList/>
                </RequireAuth>
            } />
            <Route path='/products' element={<Products/>} />
            <Route path='/upload-product' element={
                <RequireAuth>
                    <UploadProduct/>
                </RequireAuth>
            } />
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
