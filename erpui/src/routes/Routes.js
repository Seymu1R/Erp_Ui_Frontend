import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import AddCustomer from '../components/Contacts/Customer/AddCustomer'
import CustomerList from '../components/Contacts/Customer/CustomerList'
import UpdateCustomer from '../components/Contacts/Customer/UpdateCustomer'
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
        <Route path='/customers' element={<CustomerList/>}></Route>
        <Route path='/addcustomer' element={<AddCustomer/>}></Route>
        <Route path="/customers/updatecustomer" element={<UpdateCustomer/>}></Route>        
    </Routes>
  )
}

export default Navigate