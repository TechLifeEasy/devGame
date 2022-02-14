const { UserModal } = require('../connections/Schema');

const isFound = async (user) => {

    const { name, email } = user;

    const isEmailExits = await UserModal.findOne({ email });
    const isNameExits = await UserModal.findOne({ name });

    console.log(isEmailExits,isNameExits)

    if (isEmailExits!=null || isNameExits!=null) {
        return true;
    }
    
    return false;
}


exports.isFound=isFound;