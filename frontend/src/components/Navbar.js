import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    padding: "10px 0px",
    flexDirection: "column",
    justifyContent: "center",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ order: "3", marginTop: "5px" })}
`;

const Language = styled.span`
  font-size: 14px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "0px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ order: "1" })}
`;

const Logo = styled.h1`
  font-weight: bold;

  ${mobile({ fontSize: "24px", margin: "5px 0px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "space-around", order: "2", width: "80%" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ marginLeft: "5px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const quantity = useSelector((state) => state.cart.quantity);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search !== "") {
      navigate("/products", {
        state: search,
      });
    }
  };

  const handleClick = () => {
    // localStorage.removeItem("user");
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>SHOPVERSE</Logo>
          </Link>
        </Center>
        <Right>
          {user.currentUser ? (
            <div>Hi {user.currentUser.username}</div>
          ) : (
            <Link to="/register">
              <MenuItem>REGISTER </MenuItem>
            </Link>
          )}
          {user.currentUser ? (
            <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
          ) : (
            <Link to="/login">
              <MenuItem>LOGIN</MenuItem>
            </Link>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
