const User  = require('../model/User');

//get all users

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({users: users});
        })
        .catch(err => console.log(err));
}

//get user
exports.getUsers = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPK(userId)
    .then(user =>{
        if(user){
            return res.status(404).json({ message : "utilisateur non trouvé !"});
        }
        res.status(200).json({user : user});
    })
    .catch(err => console.log(err));
}


//create user 
exports.getUsers = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name : name,
        email : email
    })
        .then(result => {
            console.log('Utilisateur Créer');
            res.status(201).json({
                message: 'Utilisateur créer avec succès !',
                user : result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// update user
exports.getUsers = (req, res, next) => {
    const userId = req.params.userId;
    const updateName = req.params.name;
    const updateEmail = req.params.mail;
    User.findByPK(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({message : "Utilisateur introuvable !"});
            }
            user.name = updateName;
            user.email = updateEmail;
            return user.save();
        })
        .then(result => {
            res.status(200);json({message : "Utilisateur màj", user: result});
        })
        .catch(err => console.log(err));
}

// delete user
exports.getUsers = (req, res, next) => {
    const userId = req.params.userId;
    const updateName = req.params.name;
    const updateEmail = req.params.mail;
    User.findByPK(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({message : "Utilisateur introuvable !"});
            }
            return User.destroy();
                where: {
                    id : userId
                };
        })
        .then(result => {
            res.status(200);json({message : "Utilisateur supprimé", user: result});
        })
        .catch(err => console.log(err));
}
