import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatient, deleteAction } from './action';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { loaderTrue } from '../../action';
import ViewModal from './PatientView';

const PatientListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.commonReducer);
  const { patientData } = useSelector((state) => state.patientReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModalIndex, setShowModalIndex] = useState(null); // Track the row index for which the modal should be shown

  useEffect(() => {
    dispatch(getPatient(currentPage, rowsPerPage));
  }, []);

  const Delete = (id) => {
    dispatch(loaderTrue());
    dispatch(deleteAction(`consultation`, id, navigate));
  };

  const blindSearch = (e) => {
    if (e.target !== null) {
      dispatch(getPatient(1, 5, e.target.value));
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row?.user?.name,
    },
    {
      name: 'Email',
      selector: (row) => row.user?.login?.email,
    },
    {
      name: 'AadharNumber',
      selector: (row) => row?.user?.aadharNumber,
    },
    {
      name: 'DOB',
      selector: (row) => row?.user?.dob,
    },
    {
      name: 'action',
      cell: (row, rowIndex) => (
        <div className="d-flex">
          <Button variant="primary" onClick={() => setShowModalIndex(rowIndex)}>
            view
          </Button>
          <ViewModal
            show={showModalIndex === rowIndex} // Show the modal only for the matching row index
            onHide={() => setShowModalIndex(null)}
            patient={row}
          />
        </div>
      ),
    },
  ];

  const data = patientData;

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <div>
        <h2 className=" text-center">Patients</h2>
        <span>Search by name or Aadhar number</span>
        <input name="search" onChange={blindSearch}></input>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={3}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[5, 10, 15]}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(currentRowsPerPage) =>
            setRowsPerPage(currentRowsPerPage)
          }
        />
      </div>
    </div>
  );
};

export default PatientListing;
