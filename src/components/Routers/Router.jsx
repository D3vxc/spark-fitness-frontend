import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Register from "../Credentials/Register";
import Login from "../Credentials/Login";
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import OtpConfirmation from "../Pages/OtpConfirmation";
import ContactUs from "../Pages/ContactUs.jsx";
import About from "../Pages/About.jsx";
import Classes from "../Pages/Classes.jsx";
import Products from "../Pages/Products.jsx";
// import { getToken } from "../../utils/token.js";
import AddProduct from "../../AdminComponents/AddProduct.jsx";
import AdminDashboard from "../../AdminComponents/AdminDashboard.jsx";
import UsersComponent from "../../AdminComponents/UsersComponent.jsx";
import ProductsComponent from "../../AdminComponents/ProductsComponent.jsx";
import ClassesComponent from "../../AdminComponents/ClassesComponent.jsx";
import Dashboard from "../../AdminComponents/DashboardComponent.jsx";
import Cart from "../Pages/Cart.jsx";
import BMI from "../Pages/BMI.jsx";
import PaymentSuccess from "../components/PaymentSuccess.jsx";
import PaymentFailed from "../components/PaymentFailed.jsx";

const HeaderFooterLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

const NoHeaderFooterLayout = ({ children }) => <main>{children}</main>;

const MainRouter = () => (
  <Router>
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/admin/users' element={<UsersComponent />} />
      <Route path='/admin/products' element={<ProductsComponent />} />
      <Route path='/admin/classes' element={<ClassesComponent />} />

      <Route path='/addProduct' element={<AddProduct />} />
      <Route path='/payment-success' element={<PaymentSuccess />} />
      <Route path='/payment-failed' element={<PaymentFailed />} />
      <Route
        path='/'
        element={
          <HeaderFooterLayout>
            <Home />
          </HeaderFooterLayout>
        }
      />
      <Route
        path='/about'
        element={
          <HeaderFooterLayout>
            <About />
          </HeaderFooterLayout>
        }
      />
      <Route
        path='/contactus'
        element={
          <HeaderFooterLayout>
            <ContactUs />
          </HeaderFooterLayout>
        }
      />
      <Route
        path='/classes'
        element={
          <HeaderFooterLayout>
            <Classes />
          </HeaderFooterLayout>
        }
      />
      <Route
        path='/products'
        element={
          <HeaderFooterLayout>
            <Products />
          </HeaderFooterLayout>
        }
      />
      <Route
        path='/cart'
        element={
          // <HeaderFooterLayout>
          <Cart />
          // </HeaderFooterLayout>
        }
      />
      <Route
        path='/bmi'
        element={
          <HeaderFooterLayout>
            <BMI />
          </HeaderFooterLayout>
        }
      />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/otp-confirmation' element={<OtpConfirmation />} />
      <Route
        path='/contact'
        element={
          <HeaderFooterLayout>
            <ContactUs />
          </HeaderFooterLayout>
        }
      />
    </Routes>
  </Router>
);

export default MainRouter;
