const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const user = require('../../models/user');
const login = require('../../models/login');
const disease = require('../../models/disease');
const diseaseList = require('../../models/diseaseList');
const { removeData } = require('../../helper/cred');

module.exports = {
  diseasePost: async (req, res) => {
    try {
      console.log(req.body);
      const currentUserId = await findOneData(user, { loginId: req.user.id });
      const informationData = {
        ...req.body,
        start_date: req.body.startDate,
        diseaseListId: req.body.diseaseName,
        userId: currentUserId.id,
      };
      const data = await postDatas(disease, informationData);
      if (data) {
        res.json(goodResponse({ data }, 'successfuly added'));
      } else {
        res.json(failedResponse('error'));
      }
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  getDiseaseInfo: async (req, res) => {
    try {
     
      const currentUserId = await user.findOne({
        where: { loginId: req.user.id },
        include: [{ model: login }]
      });
      console.log(currentUserId)
      if (currentUserId?.login?.role === 'patient') {
      let diseaseInfo = await disease.findAll({
        where: { userId: currentUserId.id },
        include: [{ model: user }, { model: diseaseList }],
      });
      return res.json(goodResponse({ diseaseInfo }, 'success'));
    }else{
      let diseaseInfo = await disease.findAll({
        include: [{ model: user }, { model: diseaseList }],
      });
      return res.json(goodResponse({ diseaseInfo }, 'success'));
    }
      
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  deleteDiseaseInfo: async (req, res) => {
    try {
      const currentDisease = await findOneData(disease, { id: req.params.id });
      if (currentDisease) {
        const data = await removeData(disease, req.params.id);
        console.log(data);
      }
      return res.json(goodResponse({ currentDisease }, 'success'));
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
};
