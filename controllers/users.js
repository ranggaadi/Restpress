module.exports.controller = (app) => {
    //get users page
    app.get('/users', (req, res) => {
        res.render('users', {title : 'Users', desc : 'Aku adalah anak gembala selau riang serta gembira'});
    })
}