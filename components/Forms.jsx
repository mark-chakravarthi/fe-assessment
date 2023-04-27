import { Button, TextField } from "@mui/material";
import React from "react";


const Forms = (props) => {

  const CustomTextField = styled(TextField)(({ theme }) => ({
    width: "95%",
    backgroundColor: theme.palette.secondary.main,
    "&  .MuiFormHelperText-root.Mui-error": {
      backgroundColor: "white",
      margin: 0,
      paddingLeft: 10,
    },
  }));

  return (
    <form >
      <Box
        sx={{
          my: 2,
          mx: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        {/* {handleDeleteMessage()}
        {errorMessage === true && (
          <Alert
            position="absolute"
            severity="error"
            sx={{
              position: "absolute",
              bottom: "23rem",
              width: "500px",
              paddingTop: 0,
              paddingBottom: 0,
              marginLeft: "13rem",
            }}
          >
            {responseMessage}
          </Alert>
        )} */}

        <Divider
          sx={{ marginTop: "15px", borderStyle: "dashed", color: "#151515" }}
        />

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Company Name*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Company Email Id*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
              mt={3}
            >
              Organization Name*
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField
              sx={{ color: "red" }}
              inputProps={{ maxLength: 30 }}
              autoComplete="given-name"
              name="companyName"
              error={!companyNameValidation}
              helperText={
                companyNameValidation === false && "Please Enter Valid Name"
              }
              required
              fullWidth
              id="companyName"
              value={companyName}
              onSelect={handleCompanyNameValidation}
              onBlur={handleCompanyNameValidation}
              onChange={(event) => {
                setCompanyName(event.target.value);
                handleCompanyNameValidation();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="family-name"
              // error={!isEmailValid}
              // helperText={
              //   isEmailValid === false && "Please Enter a Valid Email"
              // }
              value={email}
              // onSelect={handleEmailOnChange}
              // onBlur={handleEmailOnChange}
              // onChange={(event) => {
              //   setEmail(event.target.value);
              //   handleEmailOnChange();
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              sx={{ color: "red" }}
              required
              name="organizationName"
              fullWidth
              inputProps={{ maxLength: 25 }}
              // error={!orgNameValidation}
              // helperText={
              //   orgNameValidation === false && "Please Enter Valid Org Name"
              // }
              id="organizationName"
              // onSelect={handleOrgNameValidation}
              // onBlur={handleOrgNameValidation}
              value={organizationName}
              // onChange={(event) => {
              //   setOrganizationName(event.target.value);
              //   handleOrgNameValidation();
              // }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            >
              Valid Till*
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{ color: "#636363", fontSize: "14px", fontWeight: "400" }}
            >
              Company ID*
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              // error={!validTillValidation}
              type="date"
              required
              fullWidth
              id="companyId"
              // helperText={
              //   validTillValidation === false && "Please Select a Date"
              // }
              name="companyId"
              value={validTill}
              // onSelect={handleValidTillValidation}
              // onBlur={handleValidTillValidation}
              inputProps={{ min: currentDate, max: "2030-12-12" }}
              // onChange={(event) => setValidTill(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              // error={!companyIdValidation}
              required
              fullWidth
              id="companyId"
              name="companyId"
              inputProps={{ maxLength: 6 }}
              onBlur={handleCompanyIdValidation}
              value={companyId}
              helperText={
                companyIdValidation === false &&
                "Must be 3 Number and 3 Letters"
              }
              onSelect={handleCompanyIdValidation}
              onChange={async (event) => {
                setCompanyId(event.target.value);
                handleCompanyIdValidation();
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} mt={2}>
          <Stack spacing={2} direction="row">
            <PrimaryButton
              variant="contained"
              disabled={!disabledAdd}
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              Add User
            </PrimaryButton>
          </Stack>
        </Grid>
      </Box>
    </form>
  );
};

export default Forms;