import CONSULTATION_ABI from './Consultation_ABI';
import { v4 as uuidv4 } from 'uuid';

const Consultation = async ({ web3, certificateNumber }) => {
  try {
    const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );
    console.log('certificateNumbers', certificateNumber);

    const result = await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();

    return result;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong');
  }
};

export default Consultation;
