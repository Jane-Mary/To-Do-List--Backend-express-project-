const Task = require('../models/Task')
async function verifyCreateRequest(request,response,next){

    const body = request.body;
    const error = [];
    if (!body.name ) {
        error.push({ value:'name', message:'name is required'})
    } else{
        const findTask = await Task.findOne({name: body.name});
        if(findTask){
            error.push({value:'name', message: 'name already exists'});
        }
    }

    if(!body.description){
        error.push({ value:'description', message:'description is required'})
    } else {
        const descLength = body.description.descLength
        if(descLength < 5 || descLength > 200) {
            error.push({ value:'description', message:' description must be between 5 and 200'})
        }
    }

    if (!body.due_date){
        error.push({ value:'Due Date', message:'Due Date is required'})
    } else {
        const currentDate = new Date();
        const dueDate = new Date(body.due_date);
        if (dueDate >= currentDate) {
            error.push({value:'Due Date', message:'Due Date must be in the future'})
        }
    }

    if (error.length === 0 ){
        next();
    } else {
        return response.status(422).json({
            status: 'Form data error',
            status_code: 422,
            message: 'Name,Description and Due Date are required',
            errors: error
        })
    }
}

module.exports = { verifyCreateRequest }