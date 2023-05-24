const Web3 = require('web3');
const { initiateTask, startTask, stopTask } = require('../../modules/cron');
const transaction = require('../../models/transaction');
const vaccination = require('../../models/vaccination');
const vaccine = require('../../models/vaccine');
const user = require('../../models/user');
const { Op } = require('sequelize');
const { goodResponse, failedResponse } = require('../../helper/response');
const {
  findOneData,
  postDatas,
  updateData,
  removeData,
} = require('../../helper/cred');
const login = require('../../models/login');
const hospital = require('../../models/hospitals');

module.exports = {
  paymentTransfer: async (req, res, next) => {
    try {
      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/ePGzsyZ5AbJmiCHltWzwDLtnAU3giphp'
      );
      console.log(req.body);
      const response = await web3.eth.getTransactionReceipt(
        req.body.result.transactionHash
      );

      const currentUserId = await findOneData(user, { loginId: req.user.id });
      console.log(currentUserId);

      const transactionData = await transaction.create({
        transactionHash: response.transactionHash,
        amount: 0.01,
        appointmentType: 'vaccination',
        userId: currentUserId.id,
      });

      const vaccinationData = await vaccination.create({
        ...req.body.formState,
        hospitalId: req.body.formState.hospital,
        transactionId: transactionData.id,
        userId: currentUserId.id,
        vaccineId: req.body.formState.vaccine,
      });

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          if (response.status === true) {
            const [onUpdate, [updateData]] = await transaction.update(
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
      res.json({ status: true, message: 'Cron job started' });
    } catch (err) {
      res.statusCode = 400;
      res.json(err.message);
    }
  },
  getVaccination: async (req, res) => {
    try {
      console.log(req.body);
      const { page, rowsPerPage } = req.query;
      console.log(req.query);
      const search =
        req.query.filterData !== 'undefined' ? req.query.filterData : '';
      console.log(search);
      const offset = (page - 1) * rowsPerPage;
      const limit = rowsPerPage;
      let vaccinationInfo;
      const currentUserId = await user.findOne({
        where: { loginId: req.user.id },
        include: [{ model: login }],
      });
      if (currentUserId?.login?.role === 'patient') {
        vaccinationInfo = await vaccination.findAndCountAll({
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
            { model: vaccine },
            { model: hospital },
          ],
          offset,
          limit: rowsPerPage,
        });
      } else {
        vaccinationInfo = await vaccination.findAndCountAll({
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
            { model: vaccine },
            { model: hospital },
          ],

          offset,
          limit: rowsPerPage,
        });
      }
      console.log(vaccinationInfo);
      return res.json(goodResponse({ vaccinationInfo }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  deleteVaccination: async (req, res) => {
    try {
      const currentVaccinaionId = await findOneData(vaccination, {
        id: req.params.id,
      });
      if (currentVaccinaionId) {
        let vaccinationInfo = await removeData(vaccination, req.params.id);
        return res.json(goodResponse({ currentVaccinaionId }, 'success'));
      }
      return res.json(failedResponse('data not found'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
};
