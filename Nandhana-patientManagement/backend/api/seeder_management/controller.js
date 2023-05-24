const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const user = require('../../models/user');
const department = require('../../models/departments');
const hospital = require('../../models/hospitals');
const doctor = require('../../models/doctors');
const diseaseListGet = require('../../models/diseaseList');
const vaccine = require('../../models/vaccine');
const consultation = require('../../models/consultation');
const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
  departmentGet: async (req, res) => {
    try {
      const data = await department.findAll({});
      res.json(goodResponse({ data }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  hospitalGet: async (req, res) => {
    try {
      const data = await hospital.findAll({});
      res.json(goodResponse({ data }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  doctorGet: async (req, res) => {
    try {
      let currentDepartment;
      let currentHospital;
      if (req.query.departmentId !== '') {
        currentDepartment = await findOneData(department, {
          id: req.query.departmentId,
        });
      }
      if (req.query.hospitalId !== '') {
        currentHospital = await findOneData(hospital, {
          id: req.query.hospitalId,
        });
      }
      let filter = {};

      if (currentDepartment) {
        filter.departmentId = currentDepartment.departmentId;
      }

      if (currentHospital) {
        filter.hospitalId = currentHospital.hospitalId;
      }
      console.log(filter);
      const data = await doctor.findAll({ where: filter });
      res.json(goodResponse({ data }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },

  getDoctorByDate: async (req, res) => {
    if (req.query.date !== '' && req.query.doctorId !== '') {
      const consultations = await consultation.findAll({
        where: {
          doctorId: req.query.doctorId,
          date: req.query.date,
        },
      });

      res.json(goodResponse({ consultations }, 'success'));
    }
  },

  diseaseListGet: async (req, res) => {
    try {
      const data = await diseaseListGet.findAll({});
      res.json(goodResponse({ data }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
  vaccineGet: async (req, res) => {
    try {
      const vaccineList = await vaccine.findAll({});

      res.json(goodResponse({ vaccineList }, 'success'));
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
};
