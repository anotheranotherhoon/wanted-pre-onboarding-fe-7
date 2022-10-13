import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './page/Home'
import ToDo from './page/ToDo'

const Router = () => {
  const isLoggedIn = localStorage.getItem('token') || null;
  return (
    <Routes>
      {isLoggedIn ? (
        <>
        <Route path='/' element={<Navigate replace to ='/todo' />} />
        <Route path='/todo' element={<ToDo/> }  />
        </>
      ) : (
        <>
        <Route path='/todo' element={<Navigate replace to ='/' />} />
        <Route path='/' element={<Home/> } />
        </>
      )}
    </Routes>
  )
}

export default Router
