import { Dialog } from '@mui/material'
import React from 'react'
import Forms from './Forms'
import RoleForm from './RolesForm'
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const DialogModal = (props) => {
  return (
    <>
    
    <Dialog  open={props.open} onClose={props.handleClose}>
        {/* <Forms handleClose={props.handleClose}/> */}
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <RoleForm handleClose={props.handleClose} itemId = {props.itemId}/>
        </CardContent>
        </Card>
    </Dialog>
    </>
  ) 
}

export default DialogModal