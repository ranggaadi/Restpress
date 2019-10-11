//mengimport User.js
var User = require("../models/User.js");

// module.exports.controller = (app) => {
//     //get users page
//     app.get('/users', (req, res) => {
//         res.render('users', {title : 'Users', desc : 'Aku adalah anak gembala selau riang serta gembira'});
//     })
// }


//digunakan untuk tes API menggunakan postman
module.exports.controller = (app) =>{
    //get all users
    app.get('/users', (req, res) => {
        User.find({}, 'name email', (error, users) => {
            if(error){
                console.log(error);
            }

            res.send({
                users : users
            })
        })
    })

    //get single user detail
    app.get('/users/:id', (req, res)=>{
        User.findById(req.params.id, 'name email', (error, user)=>{
            if(error){
                console.log(error)
            }
            
            res.send(user);
        })
    })

    //POST a new user (menggunakan raw)
    app.post('/users', (req, res) => {
        const newUser = new User({
            name : req.body.name,
            email : req.body.email
        })

        newUser.save((error, user)=>{
            if(error){
                console.log(error)
            }

            res.send(user);
        })
    })

    //PUT (update the user)
    app.put('/users/:id', (req, res)=>{
        User.findById(req.params.id, 'name email', (error, user)=>{
            if(error){
                console.error(error);
            }

            user.name = req.body.name
            user.email = req.body.email
            user.save((error, user)=>{
                if(error){
                    console.log(error)
                }
                
                res.send(user)
            })
        })
    })

    //DELETE (hapus user)
    app.delete('/users/:id', (req, res)=>{
        User.remove(
            {
                _id : req.params.id
            }, (error, user) => {
                if(error){
                    console.log(error)
                }

                res.send(
                    {
                        success : true,
                        user : user
                    }
                )
            }
        )
    })
}