import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import HomeJava from "./HomeComponents/Home";
import Login from "./Login";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Order from "./Order";
import Register from "./Register";
import Nav from "./Nav";
import FooterNav from "./FooterNav";
import DrinkProducts from "./DrinkComponents/DrinkProducts";
import DrinksCoffees from "./DrinkComponents/DrinksCoffees";
import DrinksTeas from "./DrinkComponents/DrinksTeas";
import DrinksSmoothies from "./DrinkComponents/DrinksSmoothies";
import DrinkProductPage from "./DrinkComponents/DrinkProductPage";
import Merches from "./MerchComponents/Merches";
import Merch from "./MerchComponents/Merch";
import MerchShirts from "./MerchComponents/MerchShirts";
import MerchHats from "./MerchComponents/MerchHats";
import MerchMugs from "./MerchComponents/MerchMugs";
import Account from "./Account";
import About from "./About/About";
import AboutLocations from "./About/AboutLocations";
import AboutCareers from "./About/AboutCareers";
import AboutContact from "./About/AboutContact";
import Logout from "./Logout";
import Review from "./Review";
import PortfolioFooters from "../PortfolioFooters";

import Admin from "./Admin/Admin";
import NotAdmin from "./Admin/NotAdmin";
import AdminDrinksMain from "./Admin/AdminDrinksMain";
import AdminDrinksCreate from "./Admin/AdminDrinksCreate";
import AdminDrinksDrink from "./Admin/AdminDrinksDrink";
import AdminMerch from "./Admin/AdminMerchesMain";
import CreateMerch from "./Admin/AdminMerchsCreate";
import AdminMerchesMerch from "./Admin/AdminMerchesMerch";
import AdminOther from "./Admin/AdminOther";

import { useSelector, useDispatch } from "react-redux";
import { scriptLoginWithToken, scriptFetchCart, scriptFetchDrinks, scriptFetchMerches, scriptFetchUserReviews } from "../store/index";
import { Routes, Route } from "react-router-dom";
import { FadeComponent } from "../FadeComponent";

const AScriptForJavaApp = () => {
  const { scriptAuth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(scriptFetchDrinks());
    dispatch(scriptFetchMerches());
    dispatch(scriptLoginWithToken());
  }, []);

  useEffect(() => {
    if (scriptAuth.id) {
      dispatch(scriptFetchUserReviews());
    }
  }, [scriptAuth]);

  useEffect(() => {
    if (!prevAuth.current.id && scriptAuth.id) {
      dispatch(scriptFetchCart());
    }
    if (prevAuth.current.id && !scriptAuth.id) {
      console.log("logged out");
    }
  }, [scriptAuth]);

  useEffect(() => {
    prevAuth.current = scriptAuth;
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <FadeComponent>
      <div className="ScriptForJava">
        <Nav />
        <img src="/assets/coffee_cup_illustration_blue.jpeg" style={{ width: "100%" }} />

        <div className="scriptforjava-app-body">
          <Routes>
            <Route path="*" element={<HomeJava />} />
            <Route path="/home" element={<HomeJava />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />

            {scriptAuth.adminStatus === true ? <Route path="/admin" element={<Admin />} /> : <Route path="/admin" element={<NotAdmin />} />}
            <Route path="/admin/drinks" element={<AdminDrinksMain />} />
            <Route path="/admin/drinks/:id" element={<AdminDrinksDrink />} />
            <Route path="/admin/drinks/create" element={<AdminDrinksCreate />} />
            <Route path="/admin/merch" element={<AdminMerch />} />
            <Route path="/admin/merch/create" element={<CreateMerch />} />
            <Route path="/admin/merch/:id" element={<AdminMerchesMerch />} />
            <Route path="/admin/other" element={<AdminOther />} />
            <Route path="/menu" element={<DrinkProducts />} />
            <Route path="/menu/coffee" element={<DrinksCoffees />} />
            <Route path="/menu/tea" element={<DrinksTeas />} />
            <Route path="/menu/smoothies" element={<DrinksSmoothies />} />
            <Route path="/menu/:id" element={<DrinkProductPage />} />
            <Route path="/merch" element={<Merches />} />
            <Route path="/merch/shirts" element={<MerchShirts />} />
            <Route path="/merch/hats" element={<MerchHats />} />
            <Route path="/merch/mugs" element={<MerchMugs />} />
            <Route path="/merch/:id" element={<Merch />} />

            {!!scriptAuth.id && <Route path="/reviews" element={<Review />} />}
            {/* <Route path="/reviews/all" element={<ReviewsAll />} /> */}
            <Route path="/reviews/:id" element={<Review />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/locations" element={<AboutLocations />} />
            <Route path="/about/careers" element={<AboutCareers />} />
            <Route path="/about/contact" element={<AboutContact />} />
            <Route path="/menu/search/:filterString" element={<DrinkProducts />} />
            <Route path="/merch/search/:filterString" element={<Merches />} />
          </Routes>
        </div>
        <div style={{ display: "flex" }}>
          <img src="/assets/background-tea.jpeg" style={{ width: "50%", filter: "sepia(25%)" }} />
          <img src="/assets/cup.jpg" style={{ width: "50%", filter: "sepia(25%)" }} />
        </div>
        <div></div>

        <FooterNav />
        <PortfolioFooters />
      </div>
    </FadeComponent>
    // </div>
  );
};

export default AScriptForJavaApp;
