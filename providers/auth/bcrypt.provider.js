const bcrypt = require('bcryptjs');

const hashPassword = async (data) =>{
    return await bcrypt.hash(data, 10);
};


const comparePassword = async (plain, hashed) =>{
    return await bcrypt.compare(plain, hashed);
};


module.exports = {
    hashPassword, 
    comparePassword
}