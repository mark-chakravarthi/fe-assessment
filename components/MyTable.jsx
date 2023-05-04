import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import deleteicon from "../images/deleteicon.png";
import editicon from "../images/editicon.png";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DialogModal from "./DialogModal";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import { axiosInstance } from "@/axios/ConfigAxios";

const MyTable = ({
  setAlert,
  setMessage,
  filterDetails,
  setFilterDetails,
  openAddModal,
  openFilterModal,
  wholesalerDetails,
  setWholesalerDetails,
  table,
  page,
  setPages,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dId, setDId] = useState(undefined);
  const [wholesalerDetailForEdit, setWholesalerDetailForEdit] = useState(
    undefined
  );
  async function filterWholesalerDetails(page) {
    axiosInstance
      .get(`filter?pageNo=${page - 1}&pageSize=5`, {
        params: filterDetails,
      })
      .then((response) => {
        // Handle response
        setWholesalerDetails(response.data.content);
        setPages(response.data.totalPages);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }
  async function getWholesalerDetails(page) {
    axiosInstance
      .get(`WholeSellers?pageNo=${page - 1}&pageSize=5&sortBy=firstName`)
      .then((response) => {
        console.log(response.data);
        setWholesalerDetails(response.data.content);
        setPages(response.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    let flag = true;
    if (flag) {
      if (
        (!openFilterModal || !openEditModal || !openDeleteModal) &&
        table === "filter"
      ) {
        filterWholesalerDetails(page);
      }
      if (
        (!openAddModal || !openEditModal || !openDeleteModal) &&
        table === "get"
      ) {
        getWholesalerDetails(page);
      }
    }
    return () => {
      // cancel the subscription
      flag = false;
    };
  }, [page, openFilterModal, openEditModal, openDeleteModal, openAddModal]);

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
  function handleEdit(existingWholesalerDetails) {
    setOpenEditModal(true);
    setWholesalerDetailForEdit(existingWholesalerDetails);
  }
  return (
    <>
      <TableContainer sx={{ width: "120%" }}>
        <Table
          sx={{
            minWidth: 800,
            borderCollapse: "separate",
            borderSpacing: "0px 10px",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: "none" }} align="left">
                First Name
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="left">
                Last Name
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="left">
                Email ID
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="left">
                Phone Number
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="left">
                Wholesaler ID
              </TableCell>
              <TableCell style={{ borderBottom: "none" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(wholesalerDetails)
              ? wholesalerDetails.map((row) => (
                  <TableRow
                    key={row.wid}
                    sx={{ backgroundColor: "#F0EFFF", "& td": { border: 0 } }}
                  >
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.emailId}</TableCell>
                    <TableCell align="left">{row.phoneNo}</TableCell>
                    <TableCell align="left">{row.wholeSalerId}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleEdit(row)}>
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
            existingWholesalerDetail={wholesalerDetailForEdit}
            setExistingWholesalerDetail={setWholesalerDetailForEdit}
            setAlert={setAlert}
            setMessage={setMessage}
            setOpenEditModal={setOpenEditModal}
            filterDetails={filterDetails}
            setFilterDetails={setFilterDetails}
            table={table}
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

export default MyTable;
