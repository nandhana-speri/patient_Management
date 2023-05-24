import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConsultationCertificate } from './action';
import DataTable from 'react-data-table-component';

const ConsultationCertificate = () => {
  const dispatch = useDispatch();
  const { certificateDatas } = useSelector((state) => state.certificateReducer);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getConsultationCertificate());
  }, []);

  const blindSearch = (e) => {
    if (e.target !== null) {
      setSearchQuery(e.target.value);
    }
  };
  const filteredData = searchQuery
    ? certificateDatas.filter(
        (row) =>
          row.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.patientUUID.includes(searchQuery)
      )
    : certificateDatas;
  console.log(filteredData);

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
      name: 'Department Name',
      selector: (row) => row?.departmentName,
    },
    {
      name: 'Doctor Name',
      selector: (row) => row?.doctorName,
    },
  ];

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <h2 className=" text-center">Consultation Certificate</h2>
      <span>search by patient name or aadhar:</span>
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
        {/* <table>
          <tr>
            <th>Certificate Number</th>
            <th>Patient Name</th>
            <th>Aadhar Number</th>
            <th>Department Name</th>
            <th>Doctor Name</th>
          </tr>
          {filteredData?.map((e) => {
            return (
              <tr>
                <td>{e.certificateNumber}</td>
                <td>{e.patientName}</td>
                <td>{e.patientUUID}</td>
                <td>{e.departmentName}</td>
                <td>{e.doctorName}</td>
              </tr>
            );
          })}
        </table> */}
      </div>
    </div>
  );
};

export default ConsultationCertificate;
