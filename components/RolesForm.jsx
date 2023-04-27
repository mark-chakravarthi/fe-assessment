import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';

const 

RoleForm = (props) => {
  const [roleName, setRoleName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [roleState, setRoleState] = useState('');
  const [isUpdateState, setIsUpdateState] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState('');

  async function postData(){
    const res = await fetch(`${process.env.BASE_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "roleName": roleName,
        "orgName": organizationName,
        "createdDate": selectedDate,
        "roleState":roleState,
        "roleId": roleId
        })
      });
  
      if (res.ok) {
        alert('Message sent!');
        setRoleName('');
        setOrganizationName('');
        setSelectedDate('');
        setRoleState('');
        setRoleId('');
        props.handleClose();
        location.reload(false);
      } else {
        alert('Something went wrong. Please try again later.');
      }
  }

   async function putItemData(id){
    const res = await fetch(`${process.env.BASE_URL}/roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "roleName": roleName,
            "orgName": organizationName,
            "createdDate": selectedDate,
            "roleState":roleState,
            "roleId": roleId,
            "id": isUpdateId
            })
      })
      if (res.ok) {
        alert('Data Updated!');
        setRoleName('');
        setOrganizationName('');
        setSelectedDate('');
        setRoleState('');
        setRoleId('');
        setIsUpdateState(false)
        props.handleClose();
        location.reload(false);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    
  }

  function getItemData(id){
    fetch(`${process.env.BASE_URL}/roles/${id}`)
        .then((res) => res.json())
        .then((data) => {
        setRoleName(data.roleName);
        setOrganizationName(data.orgName);
        setSelectedDate(data.createdDate);
        setRoleState(data.roleState);
        setRoleId(data.roleId);
        setIsUpdateState(true)
        setIsUpdateId(data.id)
        });
  }

  useEffect(() => {
    if(props.itemId != '')
    {
        getItemData(props.itemId)
    }
    
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    if(!isUpdateState)
        postData();
    else
        putItemData(isUpdateId)
    };

  return (
    <div style={{'display': 'flex'}}>
        <form onSubmit={handleSubmit}>
        <TextField
        label="Role Name"
        variant="outlined"
        margin="normal"
        value={roleName}
        onChange={e=>{
            setRoleName(e.target.value)
        }}
        fullWidth
        required
      />

      <TextField
        label="Organization Name"
        variant="outlined"
        margin="normal"
        value={organizationName}
        onChange={e=>{
            setOrganizationName(e.target.value)
        }}
        fullWidth
        required
      />

<TextField
        label="Created Date"
        variant="outlined"
        margin="normal"
        value={selectedDate}
        onChange={e=>{
            setSelectedDate(e.target.value)
        }}
        fullWidth
        required
      />
      {/* <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}

<Select
      value={roleState}
      onChange={e=>{
        setRoleState(e.target.value)
      }}
      label="Role State"
      variant="outlined"
      margin="normal"
      sx={{ width: 200 }}
    >
      <MenuItem value={true}>active</MenuItem>
      <MenuItem value= {false}>inactive</MenuItem>
    </Select>

<TextField
        label="Role Id"
        variant="outlined"
        margin="normal"
        value={roleId}
        onChange={e=>{
            setRoleId(e.target.value)
        }}
        fullWidth
        required
      />    
      <Button type="submit" variant="contained" color="primary">
        {
            isUpdateState && "Update Data" ||  "Add Role"
        }
      </Button>
    </form></div>

  );
}

export default RoleForm;