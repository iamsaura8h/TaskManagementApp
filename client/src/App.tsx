import {Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/home';
import CreateUser from './pages/createUser';
import { ViewUsers } from './pages/viewUsers';

function App () {
  return(
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/createUser' element={<CreateUser/>} />
      <Route path='/viewUsers' element={<ViewUsers/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App;