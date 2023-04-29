import { useState } from 'react';
import { TextField, Button, Grid , Typography, Divider} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';

const RoleForm = (props) => {

  // role form fields
  const [roleName, setRoleName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [roleState, setRoleState] = useState('');

  // is it update or add to control modal
  const [isUpdateState, setIsUpdateState] = useState(false);

  // which item is getting updated 
  const [isUpdateId, setIsUpdateId] = useState('');

  // role id valid invalid state
  const [isvalidId, setisvalidId] = useState(true);

  async function postData(){

    // post request
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


  // update request
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

      if (res.ok) {
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


  // get item by id for update fields
  function getItemData(id){
    fetch(`${process.env.BASE_URL}/roles/${id}`)
        .then((res) => res.json())
        .then((data) => {
        setRoleName(data.roleName);
        setOrganizationName(data.orgName);
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

    if(!isUpdateState && isvalidId)
        postData();
    else if(isUpdateState && isvalidId)
        putItemData(isUpdateId)

    else 
        alert('Please enter valid role ID');
    };

    // test whether role id is valid

    const handleroleId = (e) => {
        setRoleId(e.target.value)
        const reg = new RegExp("^[A-Z]{3}[0-9]{3}$");
        setisvalidId(reg.test(e.target.value));
    }

  return (

    <form  onSubmit={handleSubmit}>

      <Grid
          container
          sx={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 1,
          marginBottom: 2,
          }}
      >

        <Grid item xs={9}>
            <Typography variant="h6" sx={{ marginLeft: 3, color: "black" }}>
            {
                isUpdateState && "Update" ||  "Add"
            }
            </Typography>
        </Grid>
                    
        <Grid item xs={3}>
            <Button variant='outlined' color="error" sx={{ width:80}} onClick={props.handleClose}>
                Cancel
            </Button>
        </Grid>

    </Grid>

    <Divider />


    <Grid container sx={{ margin: 3 }}>
        
        <Grid item xs={3} sx={{ marginBottom: 3 }}>
            <TextField
                variant="outlined"
                label="Role Name"
                sx={{ Padding: 5 }}
                value={roleName}
                onChange={e=>{
                  setRoleName(e.target.value)
              }}
              required
            />
        </Grid>

        <Grid item xs={4} sx={{ marginBottom: 3 , marginLeft : 3 }}>
            <TextField
                variant="outlined"
                label="Organisation Name"
                value={organizationName}
                onChange={e=>{
                  setOrganizationName(e.target.value)
                
              }}
                required
            />
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 3 , marginLeft : 3 }}>
            <TextField
                variant="outlined"
                label="Created Date"
                value={selectedDate}
                onChange={e=>{
                  setSelectedDate(e.target.value)
                }}
                required
            />
        </Grid>

        <Grid item xs={5} sx={{ marginBottom: 3 }}>
            <Select
                value={roleState}
                onChange={e=>{
                  setRoleState(e.target.value)
                }}
                label="Role State"
                variant="outlined"
                sx={{ width: 142 }}
                required
                >
                <MenuItem value={true}>active</MenuItem>
                <MenuItem value= {false}>inactive</MenuItem>
            </Select>
        </Grid>

        <Grid item xs={5} sx={{ marginBottom: 3 }}>
            <TextField
                variant="outlined"
                label="Role Id"
                value={roleId}
                onChange={handleroleId}
                error={!isvalidId}
                required
            />
        </Grid>

        <div>
            <Button type="submit" variant='contained' sx={{color:"#fff" , width:120}}>
            {
                isUpdateState && "Update" ||  "ADD"
            }
          </Button>
        </div>
        
    </Grid>

    </form>

  );
}

export default RoleForm;