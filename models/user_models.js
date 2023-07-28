
const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const UserSchema=  new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    
    password:{
        type:String,
        unique:false,
        required:true
    }
    
});

// UserSchema.plugin(uniqueValidator,{message:'User exists' });



const collection=mongoose.model('User', UserSchema);
module.exports=collection;
