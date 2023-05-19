import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Logar from './pages/Logar';
import Cadastrar from './pages/Cadastrar';
import Main from './pages/Main';


function RotasProtegidas({ redirectTo }) {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<RotasProtegidas redirectTo={'/login'} />} >
            <Route exact path='/' element={<Main />} />
          </Route>
          <Route path='/signup' element={<Cadastrar />} />
          <Route path='/login' element={<Logar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
