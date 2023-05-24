const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const health = require('../../models/healthInformation');
const user = require('../../models/user');

module.exports = {
  // healthInformation finction
  healthInformation: async (req, res) => {
    try {
      const currentUserId = await findOneData(user, { loginId: req.user.id });
      const informationData = { ...req.body, userId: currentUserId.id };
      const data = await postDatas(health, informationData);
      if (data) {
        res.json(goodResponse({ data }, 'successfuly added'));
      } else {
        res.json(failedResponse('error'));
      }
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  healthInformationEdit: async (req, res) => {
    try {
      const currentUserId = await findOneData(user, { loginId: req.user.id });
      const informationData = { ...req.body, userId: currentUserId.id };
      const currentHealthInfo = await findOneData(health, {
        userId: currentUserId.id,
      });
      if (currentHealthInfo) {
        const data = await updateData(
          health,
          currentHealthInfo.id,
          informationData
        );
        if (data) {
          res.json(goodResponse({ data }, 'successfuly updated'));
        }
      } else {
        res.json(failedResponse('error'));
      }
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  getHealthInfo: async (req, res) => {
    try {
      const currentUserId = await findOneData(user, { loginId: req.user.id });
      let healthInfo = await health.findOne({
        where: { userId: currentUserId.id },
        include: [{ model: user }],
      });
      return res.json(goodResponse({ healthInfo }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
};
