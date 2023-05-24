import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

function CertificateDetailsModal(props) {
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Certificate Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
            <h2>Certificate Details</h2>
            <div className="details">
              <p>
                <strong>Certificate Title:</strong> {certificate.title}
              </p>
              <p>
                <strong>Recipient Name:</strong> {certificate.recipientName}
              </p>
              <p>
                <strong>Certificate ID:</strong> {certificate.certificateId}
              </p>
              <p>
                <strong>Issued By:</strong> {certificate.issuedBy}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CertificateDetailsModal;
