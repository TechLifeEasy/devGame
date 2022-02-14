const { SourceModal } = require('../connections/Schema');

const isFound = async (title) => {


    const isEmailExits = await SourceModal.findOne({ title });

    // console.log(isEmailExits,isNameExits)

    if (isEmailExits!=null) {
        return true;
    }
    
    return false;
}


exports.isFound=isFound;