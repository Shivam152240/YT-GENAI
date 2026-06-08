const {  mongoose } = require("mongoose")



const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        require : [true, 'technical question is required']
    },
    intention  : {
        type : String,
        require : [ true, 'intention is required']
    },
    answer : {
        type : String,
        require : [true, 'answer is required']
    }
},{
    _id : false
})
const behavioralQuestionSchema = new mongoose.Schema({
     question : {
        type : String,
        require : [true, 'technical question is required']
    },
    intention  : {
        type : String,
        require : [ true, 'intention is required']
    },
    answer : {
        type : String,
        require : [true, 'answer is required']
    }
},{
    _id : false
})


const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        require : [true, 'skill is rquired']
    }, 
    severity : {
        type : String,
        enum : ['low','medium','high']
    }
},{
    _id : false
})
const preparationPlanSchema =  new mongoose.Schema({
    day : {
        type : String,
        require : [true, 'day is rquired']
    },
    focus : {
        type : String,
        require : [true, 'focus is require']
    },
    tasks:[{
        type : String,
        require : [true, 'task is require']
    }]
},{
    _id : false
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        require : [true, 'description is require']
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestion : [technicalQuestionSchema],
    behavioralQuestion : [behavioralQuestionSchema],
    skillGap :[skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title : {
        type : String,
        require : [true, 'title is require']
    }
},{
    timestamps : true
})

const interviewModelReport = mongoose.model('interviewReport', interviewReportSchema)
module.exports = interviewModelReport