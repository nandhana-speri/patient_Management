const Web3 = require('web3');
const { initiateTask, startTask, stopTask } = require('../../modules/cron');
const transaction = require('../../models/transaction');
const consultation = require('../../models/consultation');
const user = require('../../models/user');
const doctor = require('../../models/doctors');
const hospital = require('../../models/hospitals');
const login = require('../../models/login');
const { Op } = require('sequelize');
const department = require('../../models/departments');

const {
  findOneData,
  postDatas,
  updateData,
  removeData,
} = require('../../helper/cred');
const { goodResponse, failedResponse } = require('../../helper/response');

module.exports = {
  paymentTransfer: async (req, res, next) => {
    try {
      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/ePGzsyZ5AbJmiCHltWzwDLtnAU3giphp'
      );

      const response = await web3.eth.getTransactionReceipt(
        req.body.result.transactionHash
      );

      const currentUserId = await findOneData(user, { loginId: req.user.id });
      console.log(currentUserId);

      const transactionData = await transaction.create({
        from: response.from,
        to: response.to,
        transactionHash: response.transactionHash,
        amount: 0.01,
        userId: currentUserId.id,
      });

      const consultationData = await consultation.create({
        ...req.body.formState,
        doctorId: req.body.formState.doctor,
        hospitalId: req.body.formState.hospital,
        departmentId: req.body.formState.department,
        transactionId: transactionData.id,
        userId: currentUserId.id,
      });

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          if (response.status === true) {
            const data = await transaction.update(
              { status: true },
              { where: { id: transactionData.id }, returning: true }
            );
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
        }
      });

      startTask(transactionOnSuccess, 'transactionOnSuccess');
      res.json({ status: true, message: 'success' });
    } catch (err) {
      res.statusCode = 400;
      res.json(err.message);
    }
  },
  getConsultation: async (req, res) => {
    try {
      console.log(req.body);
      const { page, rowsPerPage } = req.query;
      console.log(req.query);
      const search =
        req.query.filterData !== 'undefined' ? req.query.filterData : '';
      console.log(search);
      const offset = (page - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const currentUserId = await user.findOne({
        where: { loginId: req.user.id },
        include: [{ model: login }],
      });
      let consultationInfo;
      if (currentUserId?.login?.role === 'patient') {
        consultationInfo = await consultation.findAndCountAll({
          where: { userId: currentUserId.id },
          include: [
            {
              model: user,
              where: {
                [Op.or]: [
                  { name: { [Op.iLike]: '%' + search + '%' } },
                  { aadharNumber: { [Op.iLike]: '%' + search + '%' } },
                  { phoneNumber: { [Op.iLike]: '%' + search + '%' } },
                ],
              },
            },
            {
              model: doctor,
              where: {
                [Op.or]: [{ name: { [Op.iLike]: '%' + search + '%' } }],
              },
            },
            { model: hospital },
            { model: department },
          ],
          offset,
          limit: rowsPerPage,
        });
      } else {
        consultationInfo = await consultation.findAndCountAll({
          include: [
            {
              model: user,
              where: {
                [Op.or]: [
                  { name: { [Op.iLike]: '%' + search + '%' } },
                  { aadharNumber: { [Op.iLike]: '%' + search + '%' } },
                  { phoneNumber: { [Op.iLike]: '%' + search + '%' } },
                ],
              },
            },
            {
              model: doctor,
            },
            { model: hospital },
            { model: department },
          ],

          offset,
          limit: rowsPerPage,
        });
      }
      return res.json(goodResponse({ consultationInfo }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  getConsultationById: async (req, res) => {
    try {
      const consultationInfo = await consultation.findOne({
        where: { id: req.params.id },
        include: [
          { model: hospital },
          { model: doctor },
          { model: department },
          { model: user },
        ],
      });
      return res.json(goodResponse({ consultationInfo }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },

  deleteConsultation: async (req, res) => {
    try {
      const currentConsultationId = await findOneData(consultation, {
        id: req.params.id,
      });
      if (currentConsultationId) {
        let consultationInfo = await removeData(consultation, req.params.id);
        return res.json(goodResponse({ currentConsultationId }, 'success'));
      }
      return res.json(failedResponse('data not found'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  patchConsultation: async (req, res) => {
    try {
      const currentConsultationId = await findOneData(consultation, {
        id: req.params.id,
      });
      if (currentConsultationId) {
        let consultationInfo = await updateData(consultation, req.params.id, {
          status: 'cancelled',
        });
        return res.json(goodResponse({ currentConsultationId }, 'success'));
      }
      return res.json(failedResponse('data not found'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  // getFilterData: async (req, res) => {
  //   try {
  //     const search = req.query.filterData || '';

  //     const data = await consultation.findAll({
  //       include: [
  //         {
  //           model: user,
  //           where: {
  //             [Op.or]: [
  //               { name: { [Op.iLike]: '%' + search + '%' } },
  //               { email: { [Op.iLike]: '%' + search + '%' } },
  //               { aadharNumber: { [Op.iLike]: '%' + search + '%' } },
  //               { phoneNumber: { [Op.iLike]: '%' + search + '%' } }
  //             ]
  //           }
  //         }
  //       ]
  //     });

  //     return res.json(data);
  //   } catch (e) {
  //     return res.json(failedResponse(e.message));
  //   }
  // }
};
