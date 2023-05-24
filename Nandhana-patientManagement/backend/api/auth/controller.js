const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas } = require('../../helper/cred');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { jwts } = require('../../config');
const login = require('../../models/login');

module.exports = {
  // login finction
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await login.findOne({ where: { email: req.body.email } });
      if (!admin) {
        return res.json({
          success: false,
          msg: 'invalid email or password',
        });
      }
      if (!(await login.verifyPassword(password, admin.password, admin.salt))) {
        return res.json({
          success: false,
          msg: 'invalid password',
        });
      }

      const accessToken = await login.generateAuthToken(admin);
      const refreshToken = await login.generateAuthToken(admin);

      return res.json(
        goodResponse(
          {
            data: {
              accessToken,
              refreshToken,
              role: admin.role,
            },
          },
          'successfuly login'
        )
      );
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },

  //   registration function
  registration: async (req, res) => {
    try {
      // checking for duplicate email
      const duplicateCheck = await findOneData(login, {
        email: req.body.email,
      });
      if (duplicateCheck !== null) {
        res.json(failedResponse('email already exist'));
      } else {
        const salt = await login.generateSalt();
        req.body.password = await login.hashPassword(req.body.password, salt);
        req.body.salt = salt;
        const LoginData = {
          email: req.body.email,
          password: req.body.password,
          salt: req.body.salt,
        };
        const currentLoginData = await postDatas(login, LoginData);
        console.log(currentLoginData);
        const userData = { ...req.body, loginId: currentLoginData.id };
        const currentUserData = await postDatas(User, userData);
        res.json(goodResponse({ currentUserData }, 'successfuly registered'));
      }
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
  getProfile: async (req, res) => {
    try {
      const token = req.header('Authorization')
        ? req.header('Authorization').replace('Bearer ', '')
        : null;
      const decoded = await jwt.verify(token, jwts.secret_key);
      let user = await login.findByPk(decoded.id);

      if (user.role === 'patient') {
        let profile = await User.findOne({
          where: { loginId: decoded.id },
          include: [{ model: login, attributes: ['email', 'role'] }],
        });
        return res.json(goodResponse({ profile }, 'success'));
      } else {
        let profile = await login.findByPk(decoded.id, {
          attributes: ['id', 'email', 'role'],
        });
        return res.json(goodResponse({ profile }, 'success'));
      }
    } catch (e) {
      return res.json(failedResponse(e.message));
    }
  },
};
