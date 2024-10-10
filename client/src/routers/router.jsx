import { createBrowserRouter,} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/home.jsx";
import Category from "../pages/category/Category.jsx";
import Search from "../pages/search/Search.jsx";
import ShopPage from "../pages/shop/ShopPage.jsx";
import Singleproduct from "../pages/shop/Singleproduct.jsx";
import Login from "../compents/Login.jsx";
import Register from "../compents/Register.jsx";
// import Addtocart from "../pages/cartpage/Addtocart.jsx";







const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {path:'/', element:<Home/>},
        {path:"/categories/:categoryName",element:<Category/>},
        {path:'/search',element:<Search/>},
        {path:'/shop',element:<ShopPage/>},
        {path:"/shop/:id",element:<Singleproduct/>},
        // {path:'/cart',element:<Addtocart/>}


      ]
    },
      {
       path:"/login",element :<Login/>
      },
      {path:'/register' , element:<Register/>}





  ]);
  export default router