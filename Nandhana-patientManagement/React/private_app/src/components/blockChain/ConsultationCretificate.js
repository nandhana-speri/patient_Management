import initiateContractTransaction from './initiateContractTransaction';
import CONSULTATION_ABI from './Consultation_ABI';
import { v4 as uuidv4 } from 'uuid';

const consultationCertificateFunction = async ({ address, web3, values }) => {
  console.log(values);
  try {
    const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    const patientName = web3.utils.padRight(
      web3.utils.fromAscii(values?.patientName),
      64
    );

    const certificateNumber = uuidv4();

    const patientUUID = web3.utils.padRight(
      web3.utils.fromAscii(values?.patientUUID),
      64
    );
    const patientRegId = values?.patientRegId;

    const doctorName = web3.utils.padRight(
      web3.utils.fromAscii(values?.doctorName),
      64
    );
    const consultationTime = values?.consultationTime;
    const departmentName = web3.utils.padRight(
      web3.utils.fromAscii(values?.departmentName),
      64
    );
    const hospitalName = web3.utils.padRight(
      web3.utils.fromAscii(values?.hospitalName),
      64
    );
    const issuerName = web3.utils.padRight(
      web3.utils.fromAscii(values?.issuerName),
      64
    );
    const issuerId = web3.utils.padRight(
      web3.utils.fromAscii(values?.issuerId),
      64
    );
    const issuedDateTime = values?.issuedDateTime;

    const createCertificationFunction =
      smartContract.methods.createCertification(
        certificateNumber,
        patientName,
        patientUUID,
        patientRegId,
        doctorName,
        consultationTime,
        departmentName,
        hospitalName,
        issuerName,
        issuerId,
        issuedDateTime
      );

    const result = await initiateContractTransaction({
      contractFunction: createCertificationFunction,
      address,
    });
    const subscription = await smartContract.events.CertificationEvent({
      fromBlock: result.blockNumber,
    });

    const decodedDataFunction = () =>
      new Promise((resolve) => {
        subscription.on('data', (event) => {
          console.log(event);
          const decodedData = {
            hospitalName: web3.utils.hexToUtf8(event.returnValues.hospitalName),
            doctorName: web3.utils.hexToUtf8(event.returnValues.doctorName),
            patientName: web3.utils.hexToUtf8(event.returnValues.patientName),
            certificateNumber: event.returnValues.certificateNumber,
            patientUUID: web3.utils.hexToUtf8(event.returnValues.patientUUID),
            patientRegId: event.returnValues.patientRegId,
            consultationTime: event.returnValues.consultationTime,
            departmentName: web3.utils.hexToUtf8(
              event.returnValues.departmentName
            ),
            issuerName: web3.utils.hexToUtf8(event.returnValues.issuerName),
            issuerId: web3.utils.hexToUtf8(event.returnValues.issuerId),
            issuedDateTime: event.returnValues.issuedDateTime,
          };

          resolve(decodedData);
        });
      });

    const decodedData = await decodedDataFunction();
    console.log(decodedData);

    if (result) {
      return { ...decodedData, transactionHash: result.transactionHash };
    } else {
      throw new Error('No result.');
    }
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

export default consultationCertificateFunction;
