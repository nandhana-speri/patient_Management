const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const user = require('../../models/user');
const login = require('../../models/login');
const Vaccination = require('../../models/vaccination');
const Consultation = require('../../models/consultation');
const { Op } = require('sequelize');
const doctor = require('../../models/doctors');
const hospital = require('../../models/hospitals');
const vaccine = require('../../models/vaccine');

module.exports = {
  getPatientInfo: async (req, res) => {
    try {
      console.log(req.body);
      const { page, rowsPerPage } = req.query;
      console.log(req.query);
      const search =
        req.query.filterData !== 'undefined' ? req.query.filterData : '';
      console.log(search);
      const offset = (page - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const users = await user.findAll({
        include: [{ model: login }],
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: '%' + search + '%' } },
            { aadharNumber: { [Op.iLike]: '%' + search + '%' } },
            { phoneNumber: { [Op.iLike]: '%' + search + '%' } },
          ],
        },
      });

      const patients = await Promise.all(
        users.map(async (user) => {
          const vaccination = await Vaccination.findAll({
            where: { userId: user.id },
            include: [{ model: hospital }, { model: vaccine }],
          });

          const consultation = await Consultation.findAll({
            where: { userId: user.id },
            include: [{ model: doctor }, { model: hospital }],
          });

          return {
            user: user,
            vaccination_status: vaccination,
            consultation_status: consultation,
          };
        })
      );
      res.json(goodResponse({ patients }, 'success'));
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error retrieving patients:', error);
      throw error;
    }
  },
};
