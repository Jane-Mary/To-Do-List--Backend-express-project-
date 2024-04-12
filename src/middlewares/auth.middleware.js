const jwt = require('jsonwebtoken');

function verifyToken(token) {
    try {
        return jwt.verify(token,'my-secret-key');
    } catch (error) {
        
    }
}

const auth = async (request,response,next) => {
//Verify if token exists
    const header = request.header("Authorization");
    console.log(header);
    if (header) {
        const token = header.split(' ')[1]; 
        const verified = verifyToken(token)
        if (verified) {
            request.user_id = verified.id;
            next();
        } else {
            response.status(401).json({
                status: ' Unauthorized',
                status_code: 401,
                message:'Login to access this resource'
    
            })
        }
        // console.log(token);
       //  console.log(verified);
    } else {
        response.status(401).json({
            status: ' Unauthorized',
            status_code: 401,
            message:'Login to access this resource'

        })
    }

};



module.exports = { auth }