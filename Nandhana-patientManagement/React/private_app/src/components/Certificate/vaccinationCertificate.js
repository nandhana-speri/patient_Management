import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVaccinationCertificate } from './action';
import DataTable from 'react-data-table-component';
import VaccinationModal from './vaccinationModal';
import { Button } from 'react-bootstrap';

const VaccinationCertificate = () => {
  const dispatch = useDispatch();
  const { vaccinationCertData } = useSelector(
    (state) => state.certificateReducer
  );
  const [viewModal, setViewModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getVaccinationCertificate());
  }, []);

  const blindSearch = (e) => {
    if (e.target !== null) {
      setSearchQuery(e.target.value);
    }
  };
  const filteredData = searchQuery
    ? vaccinationCertData.filter(
        (row) =>
          row.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.patientUUID.includes(searchQuery)
      )
    : vaccinationCertData;

  const columns = [
    {
      name: 'Certificate Number',
      selector: (row) => row?.certificateNumber,
    },
    {
      name: 'Patient Name',
      selector: (row) => row?.patientName,
    },
    {
      name: 'Aadhar Number',
      selector: (row) => row.patientUUID,
    },

    {
      name: 'vaccine Name',
      selector: (row) => row?.vaccineName,
    },
    {
      name: 'antigen',
      selector: (row) => row?.antigen,
    },
    {
      name: 'disease',
      selector: (row) => row?.disease,
    },
    // {
    //   name: 'action',
    //   selector: (row, rowIndex) => (
    //     <div className="d-flex">
    //       <Button variant="primary" onClick={() => setViewModal(rowIndex)}>
    //         view
    //       </Button>
    //       <VaccinationModal
    //         show={viewModal === rowIndex}
    //         onHide={() => setViewModal(false)}
    //         certificate={row}
    //       />
    //     </div>
    //   ),
    // },
  ];
  const data = vaccinationCertData;

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <h2 className=" text-center">Vaccination Certificate</h2>
      <span>search by Patient name or aadhar:</span>
      <input name="search" onChange={blindSearch}></input>
      <div>
        <DataTable
          columns={columns}
          data={filteredData ?? []}
          paginationServer
          pagination
          paginationTotalRows={100}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
        />
      </div>
    </div>
  );
};

export default VaccinationCertificate;
