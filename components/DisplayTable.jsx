import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import deleteicon from "../images/deleteicon.png";
import editicon from "../images/editicon.png";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DialogModal from "./DialogModal";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import { AxiosInstance } from "@/axios/ConfigAxios";

const DisplayTable = (props) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dId, setDId] = useState(undefined);
  const [wholesalerDetailForEdit, setWholesalerDetailForEdit] = useState(
    undefined
  );
  const setAlert = props.setAlert;
  const setMessage = props.setMessage;

  const openAddModal = props.openAddModal;
  const wholesalerDetails = props.wholesalerDetails;
  const setWholesalerDetails = props.setWholesalerDetails;
  const table = props.table;

  async function getWholesalerDetails(page) {
    AxiosInstance.get(
      `WholeSellers?pageNo=${page - 1}&pageSize=5&sortBy=firstName`
    )
      .then((response) => {
        // Handle response
        // console.log(response.data.content);
        setWholesalerDetails(response.data.content);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }

  useEffect(() => {
    let flag = true;
    if (flag) {
      if (
        !openAddModal || !openEditModal || !openDeleteModal &&
        table === "get"
      ) {
        getWholesalerDetails(props.page);
      }
    }
    return () => {
      // cancel the subscription
      flag = false;
    };
  }, [props.page, openAddModal, openEditModal, openDeleteModal]);

  // useEffect(() => {
  //   let flag = true;
  //   if (flag) {
  //     if (dId !== undefined && openDeleteModal === false) {
  //       setOpenDeleteModal(true);
  //     } else {
  //       setOpenDeleteModal(false);
  //     }
  //   }
  //   return () => {
  //     // cancel the subscription
  //     flag = false;
  //   };
  // }, [dId]);

  useEffect(() => {
    let flag = true;
    if (flag) {
      if (wholesalerDetailForEdit !== undefined && openEditModal === false) {
        setOpenEditModal(true);
      } else {
        setOpenEditModal(false);
      }
    }
    return () => {
      // cancel the subscription
      flag = false;
    };
  }, [wholesalerDetailForEdit]);

  function handleCloseEditModal() {
    setOpenEditModal(false);
  }
  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }
  function handleDelete(wid) {
    setOpenDeleteModal(true);
    setDId(wid);
  }
  function handleEdit(fname, lname, email, pno, wId, role, locId) {
    const existingDetails = {
      fname: fname,
      lname: lname,
      email: email,
      pno: pno,
      wId: wId,
      role: role,
      locId: locId,
    };
    setWholesalerDetailForEdit(existingDetails);
  }
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "120%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email ID</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Wholesaler ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(wholesalerDetails)
              ? wholesalerDetails.map((row) => (
                  <TableRow
                    key={row.wid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.emailId}</TableCell>
                    <TableCell align="left">{row.phoneNo}</TableCell>
                    <TableCell align="left">{row.wholeSalerId}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          handleEdit(
                            row.firstName,
                            row.lastName,
                            row.emailId,
                            row.phoneNo,
                            row.wholeSalerId,
                            row.role,
                            row.locId
                          )
                        }
                      >
                        <Image src={editicon} />
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(row.wholeSalerId);
                        }}
                      >
                        <Image src={deleteicon} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogModal
        open={openEditModal}
        children={
          <EditForm
            wDetail={wholesalerDetailForEdit}
            wholesalerDetails={wholesalerDetails}
            setWholesalerDetails={setWholesalerDetails}
            setAlert={setAlert}
            setMessage={setMessage}
            setOpenEditModal={setOpenEditModal}
          />
        }
        handleClose={handleCloseEditModal}
      />

      <DialogModal
        open={openDeleteModal}
        children={
          <DeleteForm
            wid={dId}
            setAlert={setAlert}
            setMessage={setMessage}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        }
        handleClose={handleCloseDeleteModal}
        maxWidth="xs"
      />
    </>
  );
};

export default DisplayTable;
