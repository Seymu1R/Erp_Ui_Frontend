import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Home from '../components/Home/Home'
import Roles from '../components/Users/Roles'
import Users from '../components/Users/Users'

function Navigate() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/roles' element={<Roles/>}></Route>
    </Routes>
  )
}

export default Navigate