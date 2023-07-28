const express=require('express');
const path=require('path');
const router=express.Router();
// const bcrypt=require('bcrypt');

const collection=require('../models/user_models');

router.use(express.json());
router.use(express.urlencoded({extended:false}));




router.get('/', (req, res)=>{
    const indexPath = path.join(__dirname, '../frontend/login_page/login.html');
    res.sendFile(indexPath);
});
router.get('/css', function(req, res) {
    res.sendFile(path.resolve(__dirname , "../frontend/login_page/login.css"));
  });
router.get('/sign-up', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/signUp_page/signup.html"));
  });
router.get('/scss', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/signUp_page/signup.css"));
  });
//main chat page
router.get('/chat', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/chat-page/chat-page.html"));
  });
// router.get('/chat-page.js', (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "../frontend/chat-page/chat-page.js"));
//   });
//   router.get('/chatDb2.js', (req,res)=>{
//     res.setHeader('Content-Type','application/javascript');
//     res.sendFile(path.resolve(__dirname, "../frontend/chat-page/chatDb2.js"));
//   });


router.post('/',async(req,res)=>{
    

   
    
    

    try {
        
        const findOneEmail = await collection.findOne({ name: req.body.username })
        console.log(findOneEmail)
        if (findOneEmail) {
            throw Error("User aldready exists");
        }
          
        
        const userData=new collection({
            name:req.body.username,
            password:req.body.password1
        })
        const regUser= await userData.save();
        res.status(200).json({message:"user added"}) 
        // res.redirect('/');

        
        
    } catch (error) {
        console.log(error.message)
        res.status(409).json({message:error.message });
        
    }
    

});
router.post('/checkLogIn',async(req,res)=>{
    try {
        const isUser=req.body.username;
        const isPassword=req.body.password;
        const user1=await collection.findOne({name:isUser});
        
       if(user1){
            if(user1.password==isPassword){
                res.redirect('/chat');
            }
            else{
                res.send("Invalid Password");
            }

       }
       else{
        res.send("Username does not exist");
       }
     
      
        
        
            
        
    
        
    } catch (error) {
        console.log(error.message);
        
    }


})

module.exports=router;