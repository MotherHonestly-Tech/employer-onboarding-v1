import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";

import MHFormControl from "../Form/MHFormControl";

import { ReactComponent as ClosedIcon } from "../../static/svg/cancel-icon.svg";
import { ReactComponent as SuccessIcon } from "../../static/svg/successDialog.svg";
import { ReactComponent as ChatIcon } from "../../static/svg/chat.svg";
import MHButton from "../Button/MHButton";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  submitName: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type SubmitName = {
  dialogTitle: string;
  buttonName: string;
  label1: string;
  type1: string;
  placeholder1: string;
  label2: string;
  type2: string;
  placeholder2: string;
};

export const DialogBox = (props: SubmitName) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpenDialog(false);
    window.location.reload();
  };

  const nextDialog = () => {
    setOpen(false);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    setTitleError(false);
    setDescriptionError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (title && description) {
      // fetch(environment.API_BASE_URL + "employee/dashboard/concierge", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({ title, description }),
      // }).then(() => nextDialog());
    }
  };

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2, mt: 3 }} {...other}>
        {children}

        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 0,
              top: -3,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <ClosedIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <>
      <MHButton onClick={() => handleClickOpen()} sx={{ width: "300px" }}>
        Start a conversation
      </MHButton>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
          sx={{ width: "529px", height: "510px", margin: "auto" }}
        >
          {titleError ? (
            <Alert
              severity="error"
              sx={{
                mb: 3,
              }}
            >
              Invalid Title or Description
            </Alert>
          ) : descriptionError ? (
            <Alert
              severity="error"
              sx={{
                mb: 3,
              }}
            >
              Invalid Title or Description
            </Alert>
          ) : null}

          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            submitName={""}
          >
            {props.dialogTitle}
          </BootstrapDialogTitle>
          <DialogContent>
            <MHFormControl
              id="text"
              type={props.type1}
              label={props.label1}
              placeholder={props.placeholder1}
              onChange={(e) => setTitle(e.target.value)}
              required
              error={'titleError'}
              autoFocus
            />
            <MHFormControl
              id="my-description"
              type={props.type2}
              label={props.label2}
              placeholder={props.placeholder2}
              onChange={(e) => setDescription(e.target.value)}
              required
              error={'descriptionError'}
              multiline
              rows={4}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <MHButton onClick={() => handleSubmit()} sx={{}}>
              {props.buttonName}
            </MHButton>
          </DialogActions>
        </BootstrapDialog>

        <div>
          <BootstrapDialog
            onClose={handleClose2}
            aria-labelledby="customized-dialog-title"
            open={openDialog}
            fullWidth
            sx={{
              width: "529px",
              height: "570px",
              margin: "auto",
            }}
          >
            <DialogContent>
              <IconButton
                aria-label="close"
                onClick={handleClose2}
                sx={{
                  position: "absolute",
                  right: 0,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <ClosedIcon />
              </IconButton>
            </DialogContent>
            <DialogContent sx={{ margin: "auto" }}>
              <SuccessIcon width={50} />
            </DialogContent>
            <DialogContent>
              <Typography
                variant="body2"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Thank you, your request has been sent. <br /> We will respond
                shortly.
              </Typography>
            </DialogContent>
            <DialogContent sx={{ margin: "auto" }}>
              <ChatIcon width={50} />
            </DialogContent>
            <DialogContent>
              <Typography
                variant="body2"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Check your Message on your Dashboard
              </Typography>
            </DialogContent>
            <DialogContent>
              <Typography
                variant="body2"
                color="initial"
                sx={{ textAlign: "center" }}
              >
                Working hours: <br />
                Mon - Friday | 8am - 6pm (EST)
              </Typography>
            </DialogContent>
            <DialogActions>
              <MHButton onClick={() => handleClose2()} sx={{}}>
                Close this window
              </MHButton>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
    </>
  );
};

export default DialogBox;
