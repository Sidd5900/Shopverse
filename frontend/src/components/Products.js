import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column", padding: "0px" })}
`;

const Products = ({ search, cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        let searchedProductsPresent = true;
        let filteredProductsPresent = true;
        if (search) {
          const desc = item.desc.toLowerCase();
          const title = item.title.toLowerCase();
          searchedProductsPresent =
            desc.includes(search.toLowerCase()) ||
            title.includes(search.toLowerCase()) ||
            item.categories.includes(search.toLowerCase());
        }
        if (filters && Object.entries(filters).length !== 0) {
          filteredProductsPresent =
            filteredProductsPresent &&
            Object.entries(filters).every(([key, value]) => {
              return item[key].includes(value);
            });
        }
        return searchedProductsPresent && filteredProductsPresent;
      })
    );
  }, [search, products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          const adate = new Date(a.createdAt);
          const bdate = new Date(b.createdAt);
          return adate - bdate;
        })
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat || search
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
