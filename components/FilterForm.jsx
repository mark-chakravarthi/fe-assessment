import { useState } from 'react';
import { TextField, Button, Grid , Typography, Divider} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const FilterForm = (props) => {
    
    const [rname, setRname] = useState('');
    const [orgname, setOrgname] = useState('');
    const [rid, setRid] = useState('');
    const [cdate, setCdate] = useState();
    const [rstate, setRstate] = useState('');

    // On Clicking filter

    async function handleFilter() {
        axios.get(`${process.env.BASE_URL}/roles/new/filter?roleName=${rname}&roleId=${rid}&orgName=${orgname}&roleState=${rstate}&&pageNo=0&pageSize=4`)
        
        .then((response) => {
            props.setData(response.data.pageList);
        })
        .catch((err) => {
            console.error(err);
        });
    }


    // Clear Filter
    function handleClear() {
        setRname("");
        setOrgname("");
        setRid('');
        setCdate('');
        setRstate("");
    }

    return (
        
        <form>

            <Grid
                container
                sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 2,
                }}
            >

                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ marginLeft: 3, color: "black" }}>
                        Filters
                    </Typography>
                </Grid>
                
                <Grid item xs={4}>
                    <Button variant='outlined' sx={{color:"#4D47C3" , width:140}} onClick={handleClear}>
                        Clear filter
                    </Button>
                </Grid>

                <Grid item xs={2}>
                    <Button variant='outlined' color="error" sx={{width:70}} onClick={props.handleFilterClose}>
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
                        value={rname}
                        onChange={(e) => setRname(e.target.value)}
                    />
                </Grid>

                <Grid item xs={4} sx={{ marginBottom: 3 , marginLeft: 3}}>
                    <TextField
                        variant="outlined"
                        label="Organisation Name"
                        value={orgname}
                        onChange={(e) => setOrgname(e.target.value)}
                    />
                </Grid>

                <Grid item xs={3} sx={{ marginBottom: 3 , marginLeft: 3}}>
                    <TextField
                        variant="outlined"
                        label="Created Date"
                        value={cdate}
                        onChange={(e) => setCdate(e.target.value)}
                    />
                </Grid>

                <Grid item xs={5} sx={{ marginBottom: 3 }}>
                    <Select
                        value={rstate}
                        onChange={e=>{
                            setRstate(e.target.value)
                        }}
                        label="Role State"
                        variant="outlined"
                        sx={{ width: 142 }}
                        >
                        <MenuItem value={true}>active</MenuItem>
                        <MenuItem value= {false}>inactive</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={5} sx={{ marginBottom: 3 }}>
                    <TextField
                        variant="outlined"
                        label="Role Id"
                        value={rid}
                        onChange={(e) => setRid(e.target.value)}
                    />
                </Grid>

                <div>
                    <Button  variant='contained' sx={{color:"#fff" , width:120}} onClick={handleFilter}>
                        filter
                    </Button>
                </div>
                
            </Grid>

        </form>

    );
}

export default FilterForm;