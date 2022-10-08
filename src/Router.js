import {Route, Routes} from 'react-router-dom'
import Home from './page/Home'
import ToDo from './page/ToDo'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<ToDo />} />
    </Routes>
  )
}

export default Router
