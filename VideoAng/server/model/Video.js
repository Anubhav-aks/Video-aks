const mongoose=require('mongoose')
const Schema=mongoose.Schema;


var Video=mongoose.model('Video',{
    title:{type:String},
    url:{type:String},
    description:{type:String}
})
module.exports={Video};
