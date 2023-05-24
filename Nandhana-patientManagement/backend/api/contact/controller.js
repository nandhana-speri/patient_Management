const {
  successMessage,
  errorMessage,
  successData,
  findOneData,
  getAllData,
  postData,
  updateData,
} = require('../../helper/cred');
const contact = require('../../models/contact');
const { goodResponse, failedResponse } = require('../../helper/response');
const transporter = require('../../modules/mailer');
module.exports = {
  // ======================================contact post=================================
  postContact: async (req, res, next) => {
    try {
      const value = { ...req.body };
      const data = await postData(contact, value);
      console.log('lll');

      if (data) {
        let mailOptions = {
          to: req.body.email,
          subject: 'Contactus-message',
          text: req.body.message,
        };

        const send = await transporter.sendMail(mailOptions);
        console.log(send);
        if (send) return res.json(goodResponse({ data }, 'success'));
      }
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  // ================================contact listing====================================
  listContact: async (req, res, next) => {
    try {
      let data = await getAllData(contact);
      console.log(data);
      return res.json(goodResponse({ data }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  // =============================contact patch=========================================
  patchContact: async (req, res, next) => {
    try {
      const dataCheck = await findOneData(contact, { id: req.params.id });
      if (dataCheck) {
        const value = {
          status: 'read',
          name: dataCheck.dataValues.name,
          phoneNumber: dataCheck.dataValues.phoneNumber,
          email: dataCheck.dataValues.email,
          message: dataCheck.dataValues.message,
        };
        let data = await updateData(contact, req.params.id, value);
        return res.json(goodResponse({ dataCheck }, 'success'));
      }
      return res.json(failedResponse(e.message));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  // =============================contact list by id=======================================
  getById: async (req, res, next) => {
    try {
      const dataCheck = await findOneData(contact, { id: req.params.id });
      if (dataCheck) {
        return res.json(goodResponse({ dataCheck }, 'success'));
      }
      return res.json(failedResponse(e.message));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
};
