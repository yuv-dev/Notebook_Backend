const userServices = require("../services/usersServices");
const errorHandler = require("./errorHandler");
const {encrypt} = require("./encryption");
const { userType } = require("./constants");
const {
  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = require("../configs/superAdminConfig");

/**
 * This function is used to create an SuperADMIN user and under any condition it must not be more than one.
 * This ADMIN will be the only admin with the highest privileges and username="ADMIN"
 * @returns {Promise<void>}
 */

const createAdmin = async () => {
  const admin = {
    email: ADMIN_EMAIL,
    username: ADMIN_USERNAME,
    password: await encrypt(ADMIN_PASSWORD),
    name: userType.admin,
    userType: userType.admin,
  };

  try {
    const ifADMINExists = await userServices.find({ username: admin.username });
    //If SuperAdmin exists then...
    if (ifADMINExists.length === 1) {
      console.log("SuperAdmin Exists");
      return;
    }

    console.log("SuperAdmin Exists", ifADMINExists);

    //If more than one SuperAdmin exists due to some issues...
    if (ifADMINExists.length > 1) {
      console.log("More than one SuperADMIN found :", ifADMINExists);
      for (let admin of ifADMINExists) {
        const deletedUser = await userServices.deleteOne(admin._id);
        console.log("Deleted ADMIN:", deletedUser);
      }
    }

    //NO SuperAdmin found. Generally for 1st run of the app
    const user = await userServices.create(admin);
    console.log("new SuperAdmin Created", user);
  } catch (error) {
    console.log("Error in creating SuperAdmin");
    errorHandler(error);
  }
};

module.exports = createAdmin;
