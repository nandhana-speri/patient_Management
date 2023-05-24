import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContact, contactPatch, getMessage } from './action';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ContactListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { role } = useSelector((state) => state.commonReducer);

  const handleClose = () => setShow(false);
  const { listContact, contactById } = useSelector(
    (state) => state.contactReducer
  );

  //================getting full contact list================
  useEffect(() => {
    dispatch(getContact('/contact'));
  }, []);

  // ================onview function=======================
  const handle = (e) => {
    dispatch(getMessage(e));
    dispatch(contactPatch(e, '', navigate));
    setShow(true);
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row?.name,
    },
    {
      name: 'email',
      selector: (row) => row?.email,
    },
    // {
    //   name: 'status',
    //   selector: (row) => row?.status,
    // },
    {
      name: 'Message',
      selector: (row) => row?.message,
    },
    {
      name: 'phone_number',
      selector: (row) => row?.phoneNumber,
    },
    {
      name: 'View',
      selector: (row) => (
        <Button variant="primary" onClick={() => handle(row.id)}>
          View Message
        </Button>
      ),
    },
  ];
  const data = listContact;

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contactById?.message}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div>
        <DataTable columns={columns} data={data} />;
      </div>
    </div>
  );
};

export default ContactListing;
