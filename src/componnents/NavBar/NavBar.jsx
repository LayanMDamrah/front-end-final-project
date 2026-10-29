import { useState } from "react";
import { NavLink } from "react-router";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import SearchBar from "../SearchBar";

export default function NavBar() {
  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/categories" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Box
      sx={{
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        py: 2,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 1, md: 2 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              backgroundColor: "var(--primary)",
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 28,
                color: "var(--nav-text)",
              }}
            />
          </Box>

          <Typography
            sx={{
              pl: 1,
              fontSize: { xs: 18, md: 20 },
              fontWeight: 600,
            }}
          >
            KaShop
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  color: "var(--span)",
                  "&.active": {
                    color: "var(--nav-text)",
                    backgroundColor: "var(--primary)",
                    fontWeight: 400,
                    fontSize: 16,
                    px: 2,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Desktop Search */}
        {!isMobile && (
          <Box
            sx={{
              width: { md: 200, lg: 300 },
              flexShrink: 1,
            }}
          >
            <SearchBar />
          </Box>
        )}

        {/* Desktop Action Icons */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <IconButton
              aria-label="toggle theme"
              onClick={() => console.log("Toggle theme")}
              sx={{ color: "var(--span)" }}
            >
              <WbSunnyOutlinedIcon />
            </IconButton>

            <IconButton
              aria-label="shopping cart"
              component={NavLink}
              to="/cart"
              sx={{ color: "var(--span)" }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>

            <IconButton
              aria-label="profile"
              component={NavLink}
              to="/profile"
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--nav-text)",
                width: 44,
                height: 44,
                "&:hover": {
                  backgroundColor: "var(--primary)",
                  opacity: 0.8,
                },
              }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Box>
        )}

        {/* Mobile Burger Button */}
        {isMobile && (
          <IconButton
            aria-label="open navigation menu"
            onClick={() => setMenuOpen(true)}
            sx={{ color: "var(--span)" }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={closeMenu}
      >
        <Box
          sx={{
            width: 260,
            p: 2,
            height: "100%",
            backgroundColor: "background.paper",
          }}
          role="navigation"
          aria-label="mobile navigation"
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
              KaShop
            </Typography>

            <IconButton
              aria-label="close navigation menu"
              onClick={closeMenu}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box sx={{ mb: 2 }}>
            <SearchBar />
          </Box>

          {/* Navigation Links */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end
                  onClick={closeMenu}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&.active": {
                      backgroundColor: "var(--primary)",
                      color: "var(--nav-text)",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Mobile Action Icons */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/cart"
                onClick={closeMenu}
                sx={{ borderRadius: 2 }}
              >
                <ShoppingCartOutlinedIcon sx={{ mr: 2 }} />
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/profile"
                onClick={closeMenu}
                sx={{ borderRadius: 2 }}
              >
                <PersonOutlineOutlinedIcon sx={{ mr: 2 }} />
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  closeMenu();
                  console.log("Toggle theme");
                }}
                sx={{ borderRadius: 2 }}
              >
                <WbSunnyOutlinedIcon sx={{ mr: 2 }} />
                <ListItemText primary="Toggle theme" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
