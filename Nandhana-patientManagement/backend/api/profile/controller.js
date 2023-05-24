const { goodResponse, failedResponse } = require('../../helper/response');
const { findOneData, postDatas, updateData } = require('../../helper/cred');
const user = require('../../models/user');
const login = require('../../models/login');

module.exports = {
  profilePatch: async (req, res) => {
    try {
      const currentUserId = await findOneData(user, { loginId: req.user.id });
      const informationData = { ...req.body, userId: currentUserId.id };

      if (currentUserId) {
        const data = await updateData(user, currentUserId.id, informationData);
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
  changePassword: async (req, res) => {
    try {
      const currentUser = await login.findOne({
        where: { email: req.user.email },
      });
      const a = await login.verifyPassword(
        req.body.oldPassword,
        currentUser.password,
        currentUser.salt
      );
      if (!a) {
        res.json(failedResponse('incorrect oldPassword'));
      } else {
        const salt = await login.generateSalt();
        updatedpassword = await login.hashPassword(req.body.newPassword, salt);
        req.body.salt = salt;
        const value = {
          password: updatedpassword,
          salt: salt,
        };
        const updateValue = await updateData(login, currentUser.id, value);
        console.log(updateValue);
        res.json(goodResponse(currentUser, 'password successfuly updated'));
      }
    } catch (e) {
      res.json(failedResponse(e.message));
    }
  },
};
