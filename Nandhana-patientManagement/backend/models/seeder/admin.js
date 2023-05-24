const login = require('../login');
const { passwordHash } = require('../../modules/passwordHashing');

(async () => {
  try {
    // let { salt, newPassword } = await ('Admin@123');

    let newPassword = await passwordHash('Admin@123');
    console.log('new', newPassword.password);
    const adminData = {
      email: 'nandhana@spericorn.com',
      role: 'admin',
      password: newPassword.password,
      salt: newPassword.salt,
    };

    let existingData = await login.findOne({
      where: { email: adminData.email },
    });

    if (!existingData) {
      const loginDetails = await login.create({
        ...adminData,
      });
      console.log('Admin created successfully');
    } else {
      console.log(`Data already exists`);
    }
  } catch (e) {
    console.log('error', e.message);
  }
})();
