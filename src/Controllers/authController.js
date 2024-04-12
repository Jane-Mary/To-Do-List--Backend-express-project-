const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function isEmail (email){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return email.match(regex) ? true : false
}


 function generateHash (password){
try {
    const salt = bcrypt.genSaltSync(11);
    return bcrypt.hashSync(password, salt);
} catch (error) {
    return false;
}
};

async function compareHash(password, hash) {

    try {
       return await bcrypt.compare(password, hash) 
    } catch (error) {
        console.log(error);
        return false
    }

}

function generateToken(id) {
    return jwt.sign({id: id},'my-secret-key',{
        expiresIn:'24h'
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token,'my-secret-key');
    } catch (error) {
        
    }
}

const register = async (request, response,next ) => {

    const errors = [];
    const { username, password, email } = request.body;
    if (!isEmail(email)) {
       errors.push({ value: 'email', message: ' Invalid email' })
    } else {
        
        const findUser = await User.findOne({ email: email.toLowerCase() });
        if( findUser){
            errors.push({ value:'email', message: ' Email already exists'})
        }
    }

    if(errors.length === 0 ){
        const hashPassword = generateHash(password);
        const user = new User({
            email:email.toLowerCase(),
            password: hashPassword,
            username: username.toLowerCase()
        })
        await user.save();
        return response.status(201).json({
            status: ' Created',
            status_code: 201,
            message:'User created succesfully', 
        });
    }

    return response.status(422).json({
        status: 'Body Error',
        status_code: 422,
        message: ' Invalid request body',
        data: errors
    })

};

const login = async (request, response,next ) => {

    const{ email, password} = request.body;
    const user = await User.findOne({ email: email.toLowerCase()});
    if (user){

        const compare = compareHash(password, user.password)
        if(compareHash(password, user.password)){
            
            console.log("Login Okay");

            return  response.status(200).json({
                status: 'ok',
                status_code: 200,
                message:'Login succesful', 
                data: { token: generateToken(user._id)}
            });
        }
        }

        return response.status(422).json({
            status: 'Inavalid Credentials',
            status_code: 422,
            message: ' Invalid rcredentials',
    })
};



module.exports = { register, login };