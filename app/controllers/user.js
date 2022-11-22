const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports ={
    addUser:(req, res)=> {
        const {firstName, lastName, role, phoneNumber, email, password } = req.body;
        bcrypt.hash(password, 10).then((password) => {

          User.create({firstName,lastName,phoneNumber, role, email, password })
            .then((data) => {
                res.send(data)})
            .catch((err) => {
                console.log(err)
                res.send(err.message)});
        });

    },
    getUser:(req,res)=>{
        const id = req.query?.id
         if(id) {
            User.findByPk(id).then((user) => {
                res.send(user)
            })
            .catch((err) => {
                console.log(err)
                res.send(err.message)
            })
        }
        else {
            User.findAndCountAll({}).then((users) => {
                res.send(users)
            })
            .catch((err) => {
                console.log(err)
                res.send(err.message)
             })
            }
       
    }, 
    updateUser: (res, req) =>{
        const{firstName, lastName, role, phoneNumber, email, password } = req.body

        if(firstName){

        }
        else if(lastName){

        }
        else if(role){

        }
        else if(phoneNumber){
            
        }
        else if(email){
            
        }
        else if(password){
            
        }
    }
}