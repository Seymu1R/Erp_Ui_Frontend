import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import AddBrand from '../components/Brands/AddBrand'
import BrandsList from '../components/Brands/BrandsList'
import UpdateBrand from '../components/Brands/UpdateBrand'
import AddCategory from '../components/Category/AddCategory'
import CategoryList from '../components/Category/CategoryList'
import UpdateCategory from '../components/Category/UpdateCategory'
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
import AddUnit from '../components/Units/AddUnit'
import UnitList from '../components/Units/UnitList'
import UpdateUnit from '../components/Units/UpdateUnit'
import AddUsers from '../components/Users/AddUsers/AddUsers'
import EditUser from '../components/Users/EditUser/EditUser'
import Roles from '../components/Users/Roles'
import UserInfo from '../components/Users/UserInfo/UserInfo'
import Users from '../components/Users/Users'
import AddVariation from '../components/Variations/AddVariation'
import UpdateVariation from '../components/Variations/UpdateVariation'
import Variationslist from '../components/Variations/Variationslist'

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
        <Route path='/variations' element={<Variationslist/>}></Route> 
        <Route path='/addvariation' element={<AddVariation/>}></Route> 
        <Route path = '/variations/update' element={<UpdateVariation/>}></Route> 
        <Route path = '/units' element={<UnitList/>}></Route>
        <Route path='/addunit' element={<AddUnit/>}></Route> 
        <Route path='/units/update' element={<UpdateUnit/>}></Route> 
        <Route path = '/categories' element={<CategoryList/>}></Route>
        <Route path='/addcategory' element={<AddCategory/>}></Route> 
        <Route path='/categories/update' element={<UpdateCategory/>}></Route> 
        <Route path='/brands' element={<BrandsList/>}></Route> 
        <Route path='/addbrand' element={<AddBrand/>}></Route> 
        <Route path='/brands/update' element={<UpdateBrand/>}></Route> 
    </Routes>
  )
}

export default Navigate