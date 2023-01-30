import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/Auths/RequireAuth";
import AddBank from "../components/Bank/AddBank";
import Bank from "../components/Bank/Bank";
import UpdateBank from "../components/Bank/UpdateBank";
import AddBrand from "../components/Brands/AddBrand";
import BrandsList from "../components/Brands/BrandsList";
import UpdateBrand from "../components/Brands/UpdateBrand";
import AddCategory from "../components/Category/AddCategory";
import CategoryList from "../components/Category/CategoryList";
import UpdateCategory from "../components/Category/UpdateCategory";
import AddCustomer from "../components/Contacts/Customer/AddCustomer";
import CustomerList from "../components/Contacts/Customer/CustomerList";
import UpdateCustomer from "../components/Contacts/Customer/UpdateCustomer";
import AddSupplier from "../components/Contacts/Supplier/AddSupplier";
import SupplierList from "../components/Contacts/Supplier/SupplierList";
import UpdateSupplier from "../components/Contacts/Supplier/UpdateSupplier";
import AddDiscount from "../components/Discount/AddDiscount";
import DiscountInfo from "../components/Discount/DiscountInfo";
import DiscountList from "../components/Discount/DiscountList";
import UpdateDiscount from "../components/Discount/UpdateDiscount";
import Home from "../components/Home/Home";
import AddProduct from "../components/Products/AddProduct";
import ProductInfoPage from "../components/Products/ProductInfo";
import ProductList from "../components/Products/ProductList";
import UpdateProduct from "../components/Products/UpdateProduct";
import PurchaseAdd from "../components/Purchase/PurchaseAdd";
import PurchaseList from "../components/Purchase/PurchaseList";
import PurchaseView from "../components/Purchase/PurchaseView";
import UpdatePurchase from "../components/Purchase/UpdatePurchase";
import PurchaseCommerceAdd from "../components/PurchaseCommerce/SellCommerceAdd";
import StockTransferCommerceAdd from "../components/PurchaseCommerce/StockTransferCommerceAdd";
import AddSell from "../components/Sell/AddSell";
import SellList from "../components/Sell/SellList";
import SellView from "../components/Sell/SellView";
import UpdateSell from "../components/Sell/UpdateSell";
import AddStock from "../components/Stock/AddStock";
import EditStock from "../components/Stock/EditStock";
import SotockView from "../components/Stock/SotockView";
import StockList from "../components/Stock/StockList";
import AddStockTransfer from "../components/StockTransfer/AddStockTransfer";
import StockTransferEdit from "../components/StockTransfer/StockTransferEdit";
import StockTransferList from "../components/StockTransfer/StockTransferList";
import NotAuthziration from "../components/UI/NotAuthziration";
import AddUnit from "../components/Units/AddUnit";
import UnitList from "../components/Units/UnitList";
import UpdateUnit from "../components/Units/UpdateUnit";
import AddUsers from "../components/Users/AddUsers/AddUsers";
import EditUser from "../components/Users/EditUser/EditUser";
import Roles from "../components/Users/Roles";
import UserInfo from "../components/Users/UserInfo/UserInfo";
import Users from "../components/Users/Users";

const ROLES = {
  Worker: "Worker",
  Admin: "Admin",
};

function Navigate() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/users"
        element={
          <RequireAuth allowedRoles={[ROLES.Admin]}>
            <Users />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/adduser"
        element={
          <RequireAuth allowedRoles={[ROLES.Admin]}>
            <AddUsers />
          </RequireAuth>
        }
      ></Route>
      <Route path="/edituser">
        <Route
          path=":userId"
          element={
            <RequireAuth allowedRoles={[ROLES.Admin]}>
              <EditUser />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/roles"
        element={
          <RequireAuth allowedRoles={[ROLES.Admin]}>
            <Roles />
          </RequireAuth>
        }
      ></Route>
      <Route path="/userinfo">
        <Route path=":userId" element={<UserInfo />} />
      </Route>
      <Route path="/customers" element={<CustomerList />}></Route>
      <Route path="/addcustomer" element={<AddCustomer />}></Route>
      <Route
        path="/customers/updatecustomer/:customerId"
        element={<UpdateCustomer />}
      ></Route>
      <Route path="/suppliers" element={<SupplierList />}></Route>
      <Route path="/addsupplier" element={<AddSupplier />}></Route>
      <Route
        path="/suppliers/updatesupplier/:supplierId"
        element={<UpdateSupplier />}
      ></Route>
      <Route path="/productlist" element={<ProductList />}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>
      <Route
        path="/productlist/updateproduct/:productid"
        element={<UpdateProduct />}
      ></Route>
      <Route
        path="/productlist/:productid"
        element={<ProductInfoPage />}
      ></Route>
      <Route path="/units" element={<UnitList />}></Route>
      <Route path="/addunit" element={<AddUnit />}></Route>
      <Route path="/units/update" element={<UpdateUnit />}></Route>
      <Route path="/categories" element={<CategoryList />}></Route>
      <Route path="/addcategory" element={<AddCategory />}></Route>
      <Route path="/categories/update/:cetegoryId" element={<UpdateCategory />}></Route>
      <Route path="/brands" element={<BrandsList />}></Route>
      <Route path="/addbrand" element={<AddBrand />}></Route>
      <Route path="/brands/update/:barndId" element={<UpdateBrand />}></Route>
      <Route path="/purchases" element={<PurchaseList />}></Route>
      <Route path="/addpurchase" element={<PurchaseAdd />}></Route>
      <Route
        path="/purchase/update/:purchaseId"
        element={<UpdatePurchase />}
      ></Route>
      <Route
        path="/purchases/view/:purchaseId"
        element={<PurchaseView />}
      ></Route>
      <Route
        path="/addpurchasecommerce"
        element={<PurchaseCommerceAdd />}
      ></Route>
      <Route path="/sales" element={<SellList />}></Route>
      <Route path="/addsell" element={<AddSell />}></Route>
      <Route path="/sales/update/:sellId" element={<UpdateSell />}></Route>
      <Route path="/productlist/view/:sellId" element={<SellView/>}></Route>
      <Route path="/discounts" element={<DiscountList />}></Route>
      <Route path="/adddiscount" element={<AddDiscount />}></Route>
      <Route
        path="/discountlist/view/:discountId"
        element={<DiscountInfo />}
      ></Route>
      <Route path="/discount/update" element={<UpdateDiscount />}></Route>
      <Route path="/stocktransferlist" element={<StockTransferList />}></Route>
      <Route path="/addstocktransfer" element={<AddStockTransfer />}></Route>
      <Route
        path="/addstocktransfercommerce"
        element={<StockTransferCommerceAdd />}
      ></Route>
      <Route path="/stocktransfer/edit" element={<StockTransferEdit />}></Route>
      <Route path="/stocklist" element={<StockList />}></Route>
      <Route path="/addstock" element={<AddStock />}></Route>
      <Route path="/editstock/:stockId" element={<EditStock />}></Route>
      <Route path="/viewstock/:stockId" element={<SotockView/>}></Route>
      <Route path="/banks" element={<Bank/>}></Route>
      <Route path="/addbank" element={<AddBank/>}></Route>
      <Route path="/banks/update/:bankid" element={<UpdateBank/>}></Route>
      <Route path="/authirize" element={<NotAuthziration/>}></Route>
    </Routes>
  );
}

export default Navigate;
