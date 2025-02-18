import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Home } from "./pages/Home";
import Ecommerce from "./assets/images/Ecommerce.png";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "./features/AddToCart/CartSlice";

// Material UI Components
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Badge, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const App: React.FC = () => {
  const cartLength = useSelector(selectTotalQuantity);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: "#b91c1c" }}>
          <Toolbar className="flex justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={Ecommerce} alt="Ecommerce Logo" className="h-12 sm:h-14" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Typography component={Link} to="/" className="text-white hover:text-gray-300  ">
                Home
              </Typography>
              <Typography component={Link} to="/store" className="text-white hover:text-gray-300 ">
                Store
              </Typography>
              <Typography component={Link} to="/cart" className="text-white hover:text-gray-300 text-xl no-underline flex items-center">
                Cart
                {cartLength > 0 && (
                  <Badge badgeContent={cartLength} color="error" className="ml-2">
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </Typography>
            </div>

            {/* Mobile Menu Button */}
            <IconButton className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
          <div className="w-64 p-4">
            {/* Close Button */}
            <IconButton onClick={() => setMenuOpen(false)} className="absolute top-2 right-2">
              <CloseIcon />
            </IconButton>

            <List>
              <ListItem  component={Link} to="/" onClick={() => setMenuOpen(false)}>
                Home
              </ListItem>
              <ListItem  component={Link} to="/store" onClick={() => setMenuOpen(false)}>
                Store
              </ListItem>
              <ListItem component={Link} to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
                {cartLength > 0 && (
                  <Badge badgeContent={cartLength} color="error" className="ml-2">
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </ListItem>
            </List>
          </div>
        </Drawer>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
