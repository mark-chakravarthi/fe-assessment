import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const RoleForm = (props) => {
  const [roleName, setRoleName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [roleState, setRoleState] = useState('');
  const [isUpdateState, setIsUpdateState] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState('');
  const [isvalidId, setisvalidId] = useState(true);

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

      if (res.ok && isvalidId) {
        alert('Added successfully!');
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

   async function putItemData(roleId){
    const res = await fetch(`${process.env.BASE_URL}/roles/${roleId}`, {
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
            // "id": isUpdateId
            })
      })

      if (res.ok && isvalidId) {
        alert('Data Updated successfully!');
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

        // const dateObj = new Date(data.createdDate);
        // const weekday = dateObj.toLocaleString('default', { weekday: 'long' });
        // const month = dateObj.toLocaleString('default', { month: 'long' });
        // const day = dateObj.getDate();
        // const year = dateObj.getFullYear();
        // const longDate = `${weekday} ${month} ${day} ${year}`;

        setSelectedDate(data.createdDate);
        
        setRoleState(data.roleState);
        setRoleId(data.roleId);
        setIsUpdateState(true);
        setIsUpdateId(data.roleId);
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

    if(!isUpdateState)
        postData();
    else
        putItemData(isUpdateId)
    };

    const handleroleId = (e) => {
        setRoleId(e.target.value)
        const reg = new RegExp("^[A-Z]{3}[0-9]{3}$");
        //test whether input is valid
        setisvalidId(reg.test(e.target.value));
    }

    // const dateHandler = (date) => {
    //   const dateObj = new Date(date);
    //   const year = dateObj.getFullYear();
    //   const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    //   const day = ('0' + dateObj.getDate()).slice(-2);
    //   const isoDate = `${year}-${month}-${day}`;
    //   console.log(isoDate);
    //   setSelectedDate(isoDate);
    //}

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

      {/* <TextField
        label="Created Date"
        variant="outlined"
        margin="normal"
        value={selectedDate}
        onChange={e=>{
            setSelectedDate(e.target.value)
        }}
        fullWidth
        required
      /> */}

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

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={(date) => setSelectedDate(new Date(date))}
          // onChange={dateHandler}
          // disablePast={true}
          // defaultValue={new Date('2022-01-01')}
          value={selectedDate}
          // renderInput={(params) => <TextField {...params} />}
          format="DD/MM/YYYY"
        />
      </LocalizationProvider> */}

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
        onChange={handleroleId}
        error={!isvalidId}
        fullWidth
        required
      />    
      <Button type="submit" sx={{color:"#fff",backgroundColor: "#4D47C3"}}>
        {
            isUpdateState && "Update" ||  "ADD"
        }
      </Button>
    </form></div>

  );
}

export default RoleForm;