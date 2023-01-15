import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import AddCustomer from '../components/Contacts/Customer/AddCustomer'
import CustomerList from '../components/Contacts/Customer/CustomerList'
import UpdateCustomer from '../components/Contacts/Customer/UpdateCustomer'
import AddSupplier from '../components/Contacts/Supplier/AddSupplier'
import SupplierList from '../components/Contacts/Supplier/SupplierList'
import UpdateSupplier from '../components/Contacts/Supplier/UpdateSupplier'
import Home from '../components/Home/Home'
import AddProduct from '../components/Products/AddProduct'
import ProductList from '../components/Products/ProductList'
import UpdateProduct from '../components/Products/UpdateProduct'
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
        <Route path='/suppliers' element={<SupplierList/>}></Route>     
        <Route path='/addsupplier' element={<AddSupplier/>}></Route>    
        <Route path='/suppliers/updatesupplier' element={<UpdateSupplier/>}></Route> 
        <Route path='/productlist' element={<ProductList/>}></Route> 
        <Route path='/addproduct' element={<AddProduct/>}></Route> 
        <Route path='/productlist/updateproduct' element={<UpdateProduct/>}></Route> 
    </Routes>
  )
}

export default Navigate