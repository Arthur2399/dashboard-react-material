import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const AlertConfirm = ({ title, message, confirm, buttonConfirm }) => {
  return (
    <Dialog
      open={confirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={buttonConfirm}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
