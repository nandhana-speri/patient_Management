import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const PatientModal = ({ show, onHide, patient }) => {
  console.log(patient);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="text-center">Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h5 className="text-primary">Personal Information</h5>
          <p>Name: {patient?.user?.name}</p>
          <p>Date of Birth: {patient?.user?.dob}</p>
          <p>Contact Number: {patient?.user?.phoneNumber}</p>
          <p>Email: {patient?.user?.login?.email}</p>
        </div>

        <div className="mb-4">
          <h5 className="text-primary">Consultation Details</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Hospital</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patient?.consultation_status.map((consultation, index) => (
                <tr key={index}>
                  <td>{consultation.date}</td>
                  <td>{consultation.doctor?.name}</td>
                  <td>{consultation.hospital?.name}</td>
                  <td>{consultation.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div>
          <h5 className="text-primary">Vaccination Details</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Hospital</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patient?.vaccination_status.map((vaccination, index) => (
                <tr key={index}>
                  <td>{vaccination.vaccine?.name}</td>
                  <td>{vaccination.date}</td>
                  <td>{vaccination.time}</td>
                  <td>{vaccination.hospital?.name}</td>
                  <td>{vaccination.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PatientModal;
