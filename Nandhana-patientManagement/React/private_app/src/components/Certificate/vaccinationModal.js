import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

function VaccinationModal({ show, onHide, certificate }) {
  const dispatch = useDispatch();
  console.log(certificate);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Certificate Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal">
          <div className="modal-content">
            <span className="close-button">&times;</span>
            <h2>Certificate Details</h2>
            <div className="details">
              <p>
                <strong>Certificate Number:</strong>
                {certificate.certificateNumber}
              </p>
              <p>
                <strong>Disease:</strong> {certificate.disease}
              </p>
              <p>
                <strong>vaccine:</strong> {certificate.vaccineName}
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

export default VaccinationModal;
