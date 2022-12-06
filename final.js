var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var userSchema = new Schema({
    "email": {"type":String, "unique":true,
    "password": String}
    
});
let User;
exports.startDB=()=>{
    return new Promise((resolve,reject) => {

        return new Promise((resolve,reject) => {
            let myDB= mongoose.createConnection("mongodb+srv://Vish01:ABCD1234@senecaweb.qdnbqtu.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true });
            myDB.on('error', (err)=>{
                console.log("Cannot connect to DB.")
             reject(err);
           });
           
           myDB.once('open', ()=>{
             User= myDB.model("finalUsers",userSchema)
             console.log("DB connection successful.");

            resolve();
           });
    
    })})



}

exports.register=(user)=>{

    return new Promise((resolve, reject) => {
        if (typeof user.password === ""  ||user.email==="")
        
        {
            reject("Empty email and passwords Not Allowed");
        }
       
        else{
            bcrypt.genSalt(10, function(err, salt) { 
                bcrypt.hash(user.password, salt, function(err, hash) { 
            
          
                user.password = hash;
                let newUser = new User(user);
        
                newUser.save((err) => {
                  if (err) {
                    if (err.code == 11000) {
                      reject("“Error: (user’s email) already exists”");
                    } else {
                      reject("Error: cannot create the user."+ err);
                    }
                  } else {
                    resolve(newUser);
                  }
                });
              })
            })}
        });      
}
exports.signIn = function(user){
    return new Promise((resolve, reject)=> {
        User.findOne({ email: user.email})
        .exec()
        .then((data) => {
         if (!data){
            console.log("Cannot find the  user: "+user.email);
            reject();
         } else{
            bcrypt.compare(user.password, data.password).then((res) => {
        
                if (res === true) {
                    resolve();
                  
                  }
                  else if(res === false){
                    reject("Incorrect Password for the user: "+user.email);
                  }
                });
  
    
         }
  
        })
    
  
    })};
        
        
        
             
