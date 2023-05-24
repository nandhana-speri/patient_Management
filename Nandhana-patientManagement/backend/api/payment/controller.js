const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const transaction = require('../../models/transaction');
const user = require('../../models/user');

module.exports = {
  // healthInformation finction
  getPayment: async (req, res) => {
    try {
      const transactionData = await transaction.findAndCountAll({
        include: { model: user },
      });
      res.json(goodResponse({ transactionData }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
};
