import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CartModel from '../pages/shop/CartModel';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../Redux/feature/auth/authApi';
import { logout } from '../Redux/feature/auth/authSlice';

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isCart, setIsCart] = useState(false);
  const handleCartToggle = () => {
    setIsCart(!isCart);
  };

  // Show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // Dropdown menu
  const [isDropdown, setDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setDropdown(!isDropdown);
  };

  // Admin dropdown
  const adminDropdown = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Item', path: '/dashboard/manage-product' },
    { label: 'All Orders', path: '/dashboard/manage-order' },
    { label: 'Add New Post', path: '/dashboard/add-new-post' },
  ];

  // User dropdown
  const userDropdown = [
    { label: 'Dashboard', path: '/dashboard/' },
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Order', path: '/dashboard/order' },
  ];

  const dropdown = user?.role === 'admin' ? [...adminDropdown] : [...userDropdown];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <>
      <header className="fixed-nav-bar w-nav">
        <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          {/* Navigation Links */}
          <ul className="navlinks">
            <li className="link"><Link to={'/'}>Home</Link></li>
            <li className="link"><Link to={'/shop'}>Shop</Link></li>
            <li className="link"><Link to={'/pages'}>Pages</Link></li>
            <li className="link"><Link to={'/contact'}>Contact</Link></li>
          </ul>

          {/* Logo */}
          <div className="navlogo">
            <Link to={'/'}>Glitter & Glam <span>.</span></Link>
          </div>

          {/* Navigation Icons */}
          <div className="navicons relative">
            {/* Search Icon */}
            <span>
              <Link to={'/search'}>
                <i className="ri-search-line"></i>
              </Link>
            </span>

            {/* Cart Icon */}
            <span className="ml-4">
              <button onClick={handleCartToggle} className="hover:text-primary">
                <i className="ri-shopping-cart-fill"></i>
                <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                  {products.length}
                </sup>
              </button>
            </span>

            {/* User Profile and Dropdown */}
            <span className="ml-4">
              {user ? (
                <>
                  <img
                    onClick={handleDropdownToggle}
                    src={user?.profileImage || avatarImg}
                    alt=""
                    className="size-6 rounded-full cursor-pointer mt-3"
                  />
                  {isDropdown && (
                    <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 
                      rounded-lg shadow-lg z-50">
                      <ul className="font-medium space-y-4 p-2">
                        {dropdown.map((menu, index) => (
                          <li key={index}>
                            <Link
                              onClick={() => setDropdown(false)}
                              className="dropdown-items"
                              to={menu.path}
                            >
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link onClick={handleLogout} className="dropdown-items">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <i className="ri-map-pin-user-fill"></i>
                </Link>
              )}
            </span>
          </div>
        </nav>

        {/* Cart Model */}
        {isCart && <CartModel products={products} isOpen={isCart} onClose={handleCartToggle} />}
      </header>
    </>
  );
}

export default Navbar;
