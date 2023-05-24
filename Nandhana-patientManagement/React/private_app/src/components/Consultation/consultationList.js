import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRoutes,
  deleteAction,
  getConsultationById,
  CertificateCreation,
  cancelAction,
  filterData,
} from './action';
import DataTable, { SortOrder } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../action';
import { getConsultation } from './action';
import Web3 from 'web3';
import ConsultationCretificate from '../blockChain/ConsultationCretificate';
import { GrCertificate } from 'react-icons/gr';
import Loader from '../loader/loader';

const VaccinationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { role, loader } = useSelector((state) => state.commonReducer);
  const { consultationData, consultationCount } = useSelector(
    (state) => state.consultationReducer
  );

  useEffect(() => {
    console.log(currentPage, rowsPerPage);
    dispatch(getConsultation(currentPage, rowsPerPage));
  }, []);
  useEffect(() => {
    dispatch(getConsultation(currentPage, rowsPerPage));
  }, [currentPage, rowsPerPage, dispatch]);

  const Delete = (id) => {
    dispatch(loaderTrue());
    dispatch(deleteAction(`consultation`, id, navigate));
  };

  const certificateGenerate = async (item) => {
    try {
      dispatch(loaderTrue());
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const ConsultationDetail = await ConsultationCretificate({
        web3,
        address: accounts[0],
        netVer,
        values: {
          patientName: item.user.name,
          patientUUID: item.user.aadharNumber,
          patientRegId: item.user.id,
          doctorName: item.doctor.name,
          consultationTime: new Date(
            `${item.date} ${item.time?.slice(0, 5)}`
          ).getTime(),
          departmentName: item.department.name,
          hospitalName: item.hospital.name,
          issuerName: item.hospital.name,
          issuerId: item.hospital.id?.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });
      dispatch(CertificateCreation(ConsultationDetail));
    } catch (e) {
      dispatch(loaderFalse());
      dispatch(setErrorMessage(`${e.message}`));
    }
  };
  const blindSearch = (e) => {
    if (e.target !== null) {
      dispatch(getConsultation(1, 5, e.target.value));
    }
  };

  const columns = [
    {
      name: 'Patient Name',
      selector: (row) => row.user?.name,
    },
    {
      name: 'Aadhar Number',
      selector: (row) => row.user?.aadharNumber,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctor?.name,
    },
    {
      name: 'Status',
      selector: (row) => row?.status,
    },

    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Time',
      selector: (row) => row?.time,
    },

    {
      name: 'action',
      cell: (row) => (
        <div className="d-flex ">
          {role === 'admin' ? (
            <Button
              variant="danger"
              className="m-1"
              onClick={() => Delete(row.id)}
            >
              <i className="fa fa-regular fa-trash"></i>
            </Button>
          ) : null}
          {role === 'admin' && row.status === 'consulted' ? (
            <Button
              variant="info"
              className="m-1"
              onClick={() => certificateGenerate(row)}
            >
              <GrCertificate />
            </Button>
          ) : null}
          {/* {role === 'patient' ? (
            <Button
              variant="danger"
              className="m-1"
              onClick={() => cancelFunction(row.id)}
            >
              cancel
            </Button>
          ) : null} */}
        </div>
      ),
    },
  ];
  const data = consultationData;

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <h2 className=" text-center">Consultation</h2>
      <div>
        {role === 'patient' ? (
          <button className="add" onClick={() => navigate('/consultation/add')}>
            Add
          </button>
        ) : null}
        <div>
          <span>Search by name or aadhar no:</span>
          <input name="search" onChange={blindSearch}></input>
        </div>
        {loader ? <Loader /> : null}

        <DataTable
          columns={columns}
          data={consultationData}
          pagination
          paginationServer
          paginationTotalRows={consultationCount}
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

export default VaccinationList;
