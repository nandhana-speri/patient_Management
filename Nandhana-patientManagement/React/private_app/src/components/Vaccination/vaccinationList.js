import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutes, deleteAction, certificateGenerationAction } from './action';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../action';
import { getVaccination } from './action';
import Loader from '../loader/loader';
import Web3 from 'web3';
import VaccinationCertificate from '../blockChain/VaccinationCertificate';

const VaccinationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.commonReducer);
  const { loader } = useSelector((state) => state.commonReducer);
  const { vaccinationData, vaccinationCount } = useSelector(
    (state) => state.vaccineReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //===========================getting vaccination========================
  useEffect(() => {
    dispatch(getVaccination(currentPage, rowsPerPage));
  }, []);

  // =========================certification generation function==========================
  const certificateGeneration = async (item) => {
    try {
      dispatch(loaderTrue());
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);
      console.log(item.time.slice(0, 5));

      const ConsultationDetail = await VaccinationCertificate({
        web3,
        address: accounts[0],
        netVer,
        values: {
          patientName: item.user.name,
          patientUUID: item.user.aadharNumber,
          patientRegId: item.user.id,
          vaccineName: item.vaccine.name,
          vaccineTakenDatetime: new Date(
            `${item.date} ${item.time?.slice(0, 5)}`
          ).getTime(),
          disease: item.vaccine.disease,
          antigen: item.vaccine.antigen?.slice(0, 32),
          issuerName: item.hospital.name,
          issuerId: item.hospital.id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });
      dispatch(certificateGenerationAction(ConsultationDetail, navigate));
    } catch (e) {
      dispatch(loaderFalse());
      dispatch(setErrorMessage(`${e.message}`));
    }
  };

  // search onchange function
  const blindSearch = (e) => {
    if (e.target !== null) {
      dispatch(getVaccination(1, 5, e.target.value));
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.user?.name,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccine?.name,
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
      selector: (row) => (
        <div>
          {console.log(row.status)}
          {role === 'admin' && row.status === 'taken' ? (
            <Button
              variant="primary"
              onClick={() => certificateGeneration(row)}
            >
              Generate Certificate
            </Button>
          ) : null}
        </div>
      ),
    },
  ];
  const data = vaccinationData;

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <h2 className=" text-center">Vaccination</h2>

      <div>
        {role === 'patient' ? (
          <button className="add" onClick={() => navigate('/vaccination/add')}>
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
          data={data}
          pagination
          paginationServer
          paginationTotalRows={vaccinationCount}
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
