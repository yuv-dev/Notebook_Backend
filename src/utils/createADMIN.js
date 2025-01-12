const userServices = require("../services/usersServices");

/**
 * This function is used to create an SuperADMIN user and under any condition it must not be more than one.
 * This ADMIN will be the only admin with the highest privileges and username="ADMIN"
 * @returns {Promise<void>}
 */

const createAdmin = async () => {
  const admin = {
    email: "admin@notebook.com",
    username: "ADMIN",
    password: "final321",
    name: "ADMIN",
    userType: "ADMIN",
  };

  try {
    const ifADMINExists = await userServices.find({ username: admin.username });
    //If SuperAdmin exists then...
    if (ifADMINExists.length === 1) {
      console.log("SuperAdmin Exists");
      return;
    }
    //If more than one SuperAdmin exists due to some issues...
    if (ifADMINExists.length > 1) {
      console.log("More than one SUperADMIN found :", ifADMINExists);
      for (let admin of ifADMINExists) {
        const deletedUser = await userServices.deleteOne(admin._id);
        console.log("Deleted ADMIN:", deletedUser);
      }
    }

    //NO SuperAdmin found. Generally for 1st run of the app 
    const user = await userServices.create(admin);
    console.log("new SuperAdmin Created", user);
  } catch (error) {
    console.log("Error in creating Admin", error);
  }
};

module.exports = createAdmin;
