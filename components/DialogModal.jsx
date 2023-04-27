import { Dialog } from '@mui/material'
import React from 'react'

const DialogModal = (props) => {
  return (
    <>
    <Dialog maxWidth="md" open={props.open} onClose={props.handleClose}>
        {props.children}
    </Dialog>
    </>
  ) 
}

export default DialogModal