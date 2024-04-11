const { Schema, model } = require('mongoose');

const taskSchema = {
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    due_date: {
        type: Date,
        require: true
    },
    isComplete: {
        type: Boolean,
        require: false,
        default: false
    },
    created_at: {
        type: Date,
        require:false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        require:false,
        default: null 
    }
};

const Task = model('task', taskSchema);

module.exports = Task;