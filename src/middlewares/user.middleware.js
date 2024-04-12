function isEmail (email){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return email.match(regex) ? true : false
}

const create = async (request, response, next) => {

        const errors = [];
        const body = request.body;
        if (!body.email || !isEmail(email)) {
           errors.push({ value: 'email', message: ' Invalid email' })
        } else {
            
            const findUser = await User.findOne({ email: email.toLowerCase() });
            if( findUser){
                errors.push({ value:'email', message: ' Email already exists'})
            }
        }
    
        if(errors.length === 0 ){
           next();
        } else {
    
        return response.status(422).json({
            status: 'Body Error',
            status_code: 422,
            message: ' Invalid request body',
            data: errors
        })
        }
    };
    

module.exports = { create }