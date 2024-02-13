const User = require('../model/User');

// Get all users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

// Get user by ID
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé !" });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

// Create user 
exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email
    })
        .then(result => {
            console.log('Utilisateur créé');
            res.status(201).json({
                message: 'Utilisateur créé avec succès !',
                user: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// Update user
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updateName = req.body.name;
    const updateEmail = req.body.email;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable !" });
            }
            user.name = updateName;
            user.email = updateEmail;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: "Utilisateur mis à jour", user: result });
        })
        .catch(err => console.log(err));
}

// Delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable !" });
            }
            return user.destroy();
        })
        .then(result => {
            res.status(200).json({ message: "Utilisateur supprimé", user: result });
        })
        .catch(err => console.log(err));
}
