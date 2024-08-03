//Store the constants in the app
const userType = {
    customer: "CUSTOMER",
    admin: "ADMIN"
};
const messages = {
    UserNotExist: 'User does not exist!',
    PasswordNotMatch: "Password does not match",
    InternalError: "Some Internal Error",
    LoginSuccess: "Login Successful",
    UserCreated: "New User created succesfully",
    UserOrEmailExist: "User or Email Already Exists",
    PhoneExists: "Phone Already Exists",
    PhoneInvalid: "Invalid phone number",
    PasswordLength: "Password should be of 8 or more letters",
    UserOrEmailNotProvided: "Both username and email not present"

};

const tag = {
    general : "General", 
    urgent: "Urgent", 
    personal : "Personal", 
    reminder : "Reminder"
}

module.exports = {
    userType, messages, tag
}