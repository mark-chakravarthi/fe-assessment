import { Dialog } from '@mui/material'
import React from 'react'
import FilterForm from '../components/FilterForm'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const FilterModal = (props) => {

  console.log(props.open)

  return (
    <>
        <Dialog open={props.open} onClose={props.handleFilterClose}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <FilterForm handleFilterClose={props.handleFilterClose} data={props.data}
            setData={props.setData}/>
            </CardContent>
        </Card>
        </Dialog>
    </>
  ) 
}

export default FilterModal