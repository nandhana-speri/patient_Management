import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayment } from './action';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { loaderTrue } from '../../action';

const PaymentListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.commonReducer);
  const { loader } = useSelector((state) => state.commonReducer);
  const { paymentData, paymentCount } = useSelector(
    (state) => state.paymentReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(paymentData);
  const timestamp = '2023-05-24T05:26:52.285Z';
  const dateObject = new Date(timestamp);
  const [searchQuery, setSearchQuery] = useState('');
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();

  useEffect(() => {
    dispatch(getPayment(currentPage, rowsPerPage));
  }, []);

  const blindSearch = (e) => {
    if (e.target !== null) {
      setSearchQuery(e.target.value);
      // dispatch(getPayment(1, 5, e.target.value));
    }
  };
  const filteredData = searchQuery
    ? paymentData.filter((row) =>
        row.appointmentType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paymentData;

  const columns = [
    {
      name: 'Date',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: 'Time',
      selector: (row) => new Date(row.createdAt).toLocaleTimeString(),
    },
    {
      name: 'Type',
      selector: (row) => row.appointmentType,
    },
    {
      name: 'User Name',
      selector: (row) => row?.user?.name,
    },

    {
      name: 'TransactionHash',
      selector: (row) => row?.transactionHash,
    },
  ];
  const data = paymentData;

  return (
    <div className="container" style={{ marginTop: '8em' }}>
      <h2 className=" text-center">Payment</h2>
      <span>search by category:</span>
      <input name="search" onChange={blindSearch}></input>
      <div>
        {role === 'patient' ? (
          <button className="add" onClick={() => navigate('/vaccination/add')}>
            Add
          </button>
        ) : null}

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationServer
          paginationTotalRows={paymentCount}
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

export default PaymentListing;
