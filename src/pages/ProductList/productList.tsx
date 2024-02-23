import "./styles.css";
import { Avatar, Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import DeleteModal from "../../component/deleteModel";
import { closeModel, fetchProductsData, openModel } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/productTypes";

export default function ProductList() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const [dataToDelete, setDataToDelete] = useState<Product | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchProductsData(""));
  }, []);

  const handleDelete = () => {
    dispatch(closeModel());
    console.log(dataToDelete);
  };
  const fetchData = (searchText: string = "") => {
    dispatch(fetchProductsData(searchText));
  };
  const handleSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchProduct(value);

    //Debouncing logic
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    const t = setTimeout(() => {
      fetchData(value);
    }, 1000);
    setTimeoutId(t);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "thumbnail",
      headerName: "Thumbnail",

      renderCell: (params) => (
        <img src={params.row.thumbnail} alt="Thumbnail" style={{ width: "100%", height: "100%" }} />
      ),
      width: 190,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Button variant="contained" sx={{ mx: "5px" }} onClick={() => navigate(`/products/${params.row.id}`)}>
            Details
          </Button>
          <Tooltip
            title={"Delete"}
            onClick={() => {
              dispatch(openModel());
              setDataToDelete(params.row);
            }}
          >
            <IconButton sx={{ borderRadius: "9px" }}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
      width: 150,
    },
  ];
  return (
    <>
      <DeleteModal handleDelete={handleDelete} />
      <Box sx={{ height: "calc(100vh - 60px)", width: "100vw", margin: "auto", maxWidth: "1040px" }}>
        <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
          <Typography
            height={50}
            fontSize={35}
            width={"50%"}
            sx={{ backgroundColor: "black", color: "white", p: "5px 20px", display: "flex", alignItems: "center" }}
          >
            Products
          </Typography>
          <input
            id="search-product"
            type="text"
            placeholder="Search products"
            value={searchProduct}
            onChange={handleSearchProduct}
          />
        </Box>
        <DataGrid
          rowHeight={150}
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          disableRowSelectionOnClick={true}
        />
      </Box>
    </>
  );
}
