import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const AlertConfirm = ({ title, message, confirm, buttonConfirm }) => {
  return (
    <Dialog
      open={confirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Contraseña cambiada correctamente"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Por su seguridad vamos a cerrar la sesión en todos los dispositivos, por favor vuelva a ingresar con las nuevas credenciales
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
