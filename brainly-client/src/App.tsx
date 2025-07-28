import './App.css'
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';
import Workspace from "./pages/Workspace";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Workspace filter="" />} />
        <Route path='/twitter' element={<Workspace filter="twitter" />} />
        <Route path='/youtube' element={<Workspace filter="youtube" />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
