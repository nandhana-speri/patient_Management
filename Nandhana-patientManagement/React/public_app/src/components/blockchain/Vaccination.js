import VACCINATION_ABI from './Vaccination_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = '0x535ac607e72146218bc5e7d3b71a37944a77025c';

  try {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    const result = await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
    

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;
