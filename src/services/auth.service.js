 const User = require('../models/user');
 const bcryptConfig = require('../configs/bcrypt.config');
 const jwtConfig  = require('../configs/jwt.config');

 class AuthService {
    async register(data){
      try {
        const hashPassword = bcryptConfig.hash(data.password);
        data.password = hashPassword;
        data.email = email.toLowerCase();
        data.username = username.toLowerCase();
        const user = new User(data)
        await user.save()

        return { error:false, user: user }
    } catch (error) {
        
        return { error:true, data: error.message}
      }
    };

    async login(email,password){

    }
 }

 module.exports = new AuthService()