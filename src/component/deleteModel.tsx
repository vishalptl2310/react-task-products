import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

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

interface DeleteModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ openModal, setOpenModal, handleDelete }) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClose}>
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
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteModal;
