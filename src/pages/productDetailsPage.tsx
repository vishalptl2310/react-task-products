import { Box, Container, ImageList, ImageListItem, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { Product } from "../types/productTypes";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const products = useSelector((state: RootState) => state.productReducer);

  useEffect(() => {
    if (typeof id === "string" && id != "") {
      const p = products.products.find((el: any) => el.id == id);
      setProduct(p);
    }
  }, [id]);

  if (!product) {
    return <Box>No Detail found</Box>;
  }

  return (
    <Container maxWidth={false} sx={{ display: "flex", alignItems: "center", flexDirection: "row", mt: "50px" }}>
      <Box sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
          {product?.images.map((item) => (
            <ImageListItem key={item}>
              <img
                srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item}?w=161&fit=crop&auto=format`}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ marginLeft: "50px" }}>
        <Typography variant="h1">{product.title}</Typography>
        <Typography variant="subtitle1">{product.description}</Typography>
        <Typography variant="h6">
          Price : <span>{`${product.price} $`}</span>
        </Typography>
        <Typography variant="h6">
          <Rating name="read-only" value={product.rating} readOnly />
        </Typography>
        {/* <Typography variant="h1">{product.title}</Typography> */}
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;
