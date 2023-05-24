import React, { useState } from 'react';
import ConsultationVerifyCert from '../blockchain/Consultation';
import VaccinationVerifyCert from '../blockchain/Vaccination';
import Web3 from 'web3';
// import CertificateDetailsModal from './modal';
import { setErrorMessage, setSuccessMessage } from '../../action';
import { useDispatch, useSelector } from 'react-redux';

function ConsultationVerify() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const containerStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '20px 80px',
    backgroundColor: '#ffffff',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '35px',
  };

  const formStyle = {
    marginTop: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#1488e9',
    color: '#ffffff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  const vaccineSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const certificateNumber =
      event.target.elements.vaccineCertificateNumber.value;
    const vaccinationData = await VaccinationVerifyCert({
      web3,
      certificateNumber,
    });
    console.log(vaccinationData);
    if (vaccinationData.certificateNumber !== '') {
      dispatch(setSuccessMessage('valid'));
    } else {
      dispatch(setErrorMessage('not valid certificate number'));
    }
    // setShowModal(true);
  };

  const consultationSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const certificateNumber =
      event.target.elements.consultationCertificateNumber.value;
    console.log(certificateNumber);
    const ConsultationData = await ConsultationVerifyCert({
      web3,
      certificateNumber,
    });
    console.log(ConsultationData);
    if (ConsultationData.certificateNumber !== '') {
      dispatch(setSuccessMessage('valid'));
    } else {
      dispatch(setErrorMessage('not valid certificate number'));
    }
  };

  return (
    <div>
      <div style={containerStyle} id="section8">
        <h1 style={headingStyle}>Vaccine Certification Verification</h1>
        <form
          id="vaccineVerificationForm"
          style={formStyle}
          onSubmit={vaccineSubmit}
        >
          <label
            htmlFor="vaccineCertificateNumber"
            style={{ display: 'block' }}
          >
            Certificate Number:
          </label>
          <input
            type="text"
            id="vaccineCertificateNumber"
            name="vaccineCertificateNumber"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Verify
          </button>
        </form>
      </div>
      <div style={containerStyle} id="section9">
        <h1 style={headingStyle}>Consultation Certification Verification</h1>
        <form style={formStyle} onSubmit={consultationSubmit}>
          <label
            htmlFor="consultationCertificateNumber"
            style={{ display: 'block' }}
          >
            Certificate Number:
          </label>
          <input
            type="text"
            id="consultationCertificateNumber"
            name="consultationCertificateNumber"
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConsultationVerify;
