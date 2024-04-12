const authService = require('../services/auth.service')

const register = async (request, response,next ) => {
    const create = await authService.register(request.body)
    if (!create.error) {
        
    
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

}

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