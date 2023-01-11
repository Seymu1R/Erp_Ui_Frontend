import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Home from '../components/Home/Home'
import AddUsers from '../components/Users/AddUsers/AddUsers'
import EditUser from '../components/Users/EditUser/EditUser'
import Roles from '../components/Users/Roles'
import UserInfo from '../components/Users/UserInfo/UserInfo'
import Users from '../components/Users/Users'

function Navigate() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/adduser' element={<AddUsers/>}></Route>
        <Route path='/edituser' element={<EditUser/>}></Route>
        <Route path='/roles' element={<Roles/>}></Route>
        <Route path='/userinfo' element={<UserInfo/>}></Route>
    </Routes>
  )
}

export default Navigate