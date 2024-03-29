import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeModel } from "../store/productSlice";
import { RootState } from "../store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = () => {
  const isModelOpen = useSelector((state: RootState) => state.productReducer.isModelOpen);
  const dataToDelete = useSelector((state: RootState) => state.productReducer.dataToDelete);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModelOpen}
        onClose={() => dispatch(closeModel())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModelOpen}>
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => dispatch(closeModel())}>
                <Close />
              </IconButton>
            </Box>
            <Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                m={2}
                mb={5}
                sx={{ textAlign: "center" }}
              >
                Are you sure you want to delete this product from the list?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => {
                    console.log(dataToDelete);
                  }}
                >
                  Yes
                </Button>
                <Button onClick={() => dispatch(closeModel())}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteModal;
