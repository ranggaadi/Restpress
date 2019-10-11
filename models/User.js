/* membuat record di mongo */
//memakai mongo
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//membuat schema
const UserSchema = new Schema({
    //validation with mongoose
    name : {
        //jika error maka akan mereturn pesan ketika validasi error
        required : [true, 'Isi sesuai dengan kartu identitas'],
        type : String
    },
    email : {
        required : [true, 'Isi dengan alamat email yang valid'],
        type : String
    }
})

//contoh Custom dan Type Validation
// var userSchema = new Schema({
//     phone : {
//         type : String,
//         validate : {
//             validator : (v)=>{
//                 return /\d{3}-\d{3}-\d{4}/.test(v);
//             },
//             message : '{VALUE} is not a valid phone number'
//         }
//     }
// })

//Nested Validation
//misal name pada collection users disimpan dengan format 
//{name : {first_name : 'Awal', last_name : 'Akhir'}}, maka perlu dilakukan
//pengecekan untuk masing masing first_name dan last_name, maka dapa digunakan

// var nameSchema = new Schema({
//     first_name : String,
//     last_name : String
// })

// var userSchema = new Schema({
//     name : {
//         type : nameSchema,
//         required : true
//     }
// })

//untuk lebih tau tentang validasi schema maka dapat dikunjungi
// http://mongoosejs.com/docs/validation.html.

//membuat user model
const User = mongoose.model("User", UserSchema)
module.exports = User

// //membuat resource User 
// const user_resource = new User({
//     name : "Billy Joe",
//     email : "lalilulelo@gmail.com"
// })

// user_resource.save((error) => {
//     if(error)
//         console.log(error);
    
//     res.send({
//         succes : true,
//         code: 200,
//         msg: "User ditambahkan!"
//     })
// })


// /*Fetching record dari mongoose*/

// //fetching all record from users
// User.find({}, 'name email', (error, users)=>{
//     if(error){ 
//         console.error(error);
//     }
    
//     res.send({
//         users : users
//         //jika diibaratkan adalah seperti ini (contoh saja)
//         // users : [
//         //     {
//         //         name : 'John Doe',
//         //         email : 'johndoe@gmail.com'
//         //     }
//         // ]
//     })
// })

// //fetching specific record
// //untuk mengambil semua record menggunakan find() sedangkan jika spesifik
// //(single) dapat menggunakan findById() atau findOne() atau menggunakan
// //where. contoh dibawah ini

// User.findById(1, 'name email', (error, user) => {
//     if(error){
//         console.error(error);
//     }
//     res.send(user)

//     /* contoh response
//     {
//         name : 'jondo',
//         email : 'jondo@gmail.com'
//     }
//     */
// })

// /* Updating records pada mongoose */

// //pertama : dengan findById() dan save()
// User.findById(1, 'name email', (error, user)=>{
//     if(error){
//         console.error(error);
//     }
    
//     user.name = 'di update';
//     user.email = 'diupdate@gmail.com'
//     user.save((error)=>{
//         if(error){
//             console.log(error);
//         }

//         res.send({
//             success : true
//         })
//     })
// })

// //kedua : findOneAndUpdate() (dapat digunakan untuk mengupdate 1 document)
// User.findOneAndUpdate({name : 'John'}, { $set: {name : 'Peter'}}, (err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     res.send(user);
// })

// //ketiga : findByIdAndUpdate() (untuk mengupdate 1 document)
// User.findByIdAndUpdate(1, { $set : {name : 'Peter'}}, (err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     res.send(user);
// })

// /* Deleting / menghapus data dari mongoose */
// //ada tiga cara untuk menghapus data dari mongoose
// //menggunakan remove(), findOneAndRemove(), dan findByIdAndRemove()

// //Pertama : menggunakan remove()
// //akan menghapus sesuai id yang dimasukan kedalam kondisi
// User.remove({_id : 1}, (err)=>{
//     if(err){
//         res.send(err)
//     }
//     res.send({
//         success : true
//     })
// })

// //Kedua : menggunakan findOneAndRemove()
// User.findOneAndRemove({ _id : 1}, (err, user)=>{
//     if(err){
//         res.send(err)
//     }

//     res.send({
//         success : true,
//         user : user
//     })
// })

// //Ketiga : menggunakan findByIdAndrRemove()
// User.findByIdAndRemove(1, (err, user)=>{
//     if(err){
//         res.send(err)
//     }
//     res.send({
//         success : true,
//         user : user
//     })
// })