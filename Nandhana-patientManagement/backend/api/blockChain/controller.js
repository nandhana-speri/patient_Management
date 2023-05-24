const cron = require('node-cron');
const transaction = require('../../models/transaction');
const { initiateTask, startTask, stopTask } = require('../../modules/cron');
const consultationCertificate = require('../../models/consultationCertificate');
const user = require('../../models/user');
const login = require('../../models/login');
const { goodResponse, failedResponse } = require('../../helper/response');
const { response } = require('../../app');
const Web3 = require('web3');
const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const VaccinationCertificate = require('../../models/vaccinationCertificate');

module.exports = {
  consultationCertificate: async (req, res) => {
    try {
      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/ePGzsyZ5AbJmiCHltWzwDLtnAU3giphp'
      );

      const response = await web3.eth.getTransactionReceipt(
        req.body.transactionHash
      );
      const transactionRecord = await transaction.create({
        transactionHash: req.body.transactionHash,
        amount: 0,
        userId: req.body.patientRegId,
        appointmentType: 'consultationCertificate',
      });

      const consultationCertRecord = await consultationCertificate.create({
        certificateNumber: req.body.certificateNumber,
        patientUUID: req.body.patientUUID,
        patientRegId: req.body.patientRegId,
        patientName: req.body.patientName,
        doctorName: req.body.doctorName,
        hospitalName: req.body.hospitalName,
        consultationTime: req.body.consultationTime,
        departmentName: req.body.departmentName,
        issuerName: req.body.issuerName,
        issuerId: req.body.issuerId,
        issuedDateTime: req.body.issuedDateTime,
        transactionId: transactionRecord.id,
      });

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          console.log(transactionRecord, response.status);
          if (response.status === true) {
            const data = await transaction.update(
              { status: true },
              { where: { id: transactionRecord.id }, returning: true }
            );
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
        }
      });
      // generatePDF();
      startTask(transactionOnSuccess, 'transactionOnSuccess');
      res.json({ status: true, message: 'success' });

      //   res.json(goodResponse('Data created successfully'));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.json(failedResponse('Error connecting to the database'));
    }
  },
  vaccinationCertificate: async (req, res) => {
    try {
      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/ePGzsyZ5AbJmiCHltWzwDLtnAU3giphp'
      );

      const response = await web3.eth.getTransactionReceipt(
        req.body.transactionHash
      );
      const transactionRecord = await transaction.create({
        transactionHash: req.body.transactionHash,
        amount: 0,
        userId: req.body.patientRegId,
        appointmentType: 'vaccinationCertificate',
      });

      const VaccinationRecord = await VaccinationCertificate.create({
        certificateNumber: req.body.certificateNumber,
        patientUUID: req.body.patientUUID,
        patientRegId: req.body.patientRegId,
        patientName: req.body.patientName,
        vaccineName: req.body.vaccineName,
        issuerName: req.body.issuerName,
        issuerId: req.body.issuerId,
        vaccineTakenDatetime: req.body.vaccineTakenDatetime,
        disease: req.body.disease,
        antigen: req.body.antigen,
        issuedDateTime: req.body.issuedDateTime,
        transactionId: transactionRecord.id,
      });

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          console.log(transactionRecord, response.status);
          if (response.status === true) {
            const data = await transaction.update(
              { status: true },
              { where: { id: transactionRecord.id }, returning: true }
            );
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
        }
      });
      // generatePDF();
      startTask(transactionOnSuccess, 'transactionOnSuccess');
      res.json({ status: true, message: 'success' });

      //   res.json(goodResponse('Data created successfully'));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.json(failedResponse('Error connecting to the database'));
    }
  },
  consultationCertificateGet: async (req, res) => {
    try {
      const currentUserId = await user.findOne({
        where: { loginId: req.user.id },
        include: [{ model: login }],
      });

      if (currentUserId?.login?.role === 'patient') {
        const Consultation = await consultationCertificate.findAndCountAll({
          where: { patientRegId: currentUserId.id },
          include: { model: transaction },
        });
        res.json(goodResponse({ Consultation }, 'success'));
      } else {
        const Consultation = await consultationCertificate.findAndCountAll({
          include: { model: transaction },
        });
        res.json(goodResponse({ Consultation }, 'success'));
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.json(failedResponse('Error connecting to the database'));
    }
  },
  vaccinationCertificateGet: async (req, res) => {
    try {
      const currentUserId = await user.findOne({
        where: { loginId: req.user.id },
        include: [{ model: login }],
      });

      if (currentUserId?.login?.role === 'patient') {
        const Vaccination = await VaccinationCertificate.findAndCountAll({
          where: { patientRegId: currentUserId.id },
          include: { model: transaction },
        });
        res.json(goodResponse({ Vaccination }, 'success'));
      } else {
        const Vaccination = await VaccinationCertificate.findAndCountAll({
          include: { model: transaction },
        });
        res.json(goodResponse({ Vaccination }, 'success'));
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.json(failedResponse(error.message));
    }
  },
};

async function generatePDF(data) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(20);

  // Set the content on the page
  page.drawText('Hello, World!', {
    x: 50,
    y: 50,
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}
