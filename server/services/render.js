
exports.homeRoutes = (req, res)=>{
    res.render("index") ; 
}

exports.addUser = (req, res)=>{
    res.render('add_user')
}

exports.update_user = (req, res)=>{
    res.render('update_user')
}