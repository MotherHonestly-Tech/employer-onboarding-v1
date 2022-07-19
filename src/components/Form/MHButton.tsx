import React from "react";

import Button from "@mui/material/Button";

import { FnComponent } from "../../models/component.model";

type Props = {
  disabled?: boolean;
  sx: object;
  variant?: "text" | "outlined" | "contained" | undefined;
};

const MHButton: FnComponent<Props> = ({ sx, variant, children }) => {
  return (
    <Button
      color={"primary"}
      variant={variant || "contained"}
      sx={{
        p: 1.8,
        ...sx,
      }}
      size="large"
      disableElevation
      fullWidth
    >
      {children}
    </Button>
  );
};

export default MHButton;
