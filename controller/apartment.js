const Apartment = require('../model/Apartment');

// Obtenir tous les appartements
exports.getApartments = (req, res, next) => {
    Apartment.findAll()
        .then(apartments => {
            res.status(200).json({ apartments: apartments });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des appartements." });
        });
}

// Obtenir un appartement par son ID
exports.getApartmentById = (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    Apartment.findByPk(apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).json({ message: "Appartement non trouvé !" });
            }
            res.status(200).json({ apartment: apartment });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'appartement." });
        });
}

// Créer un appartement
exports.createApartment = (req, res, next) => {
    const { surface_area, capacity, address, availability, price_per_night } = req.body;
    Apartment.create({
        surface_area: surface_area,
        capacity: capacity,
        address: address,
        availability: availability,
        price_per_night: price_per_night
    })
        .then(result => {
            console.log('Appartement créé');
            res.status(201).json({
                message: 'Appartement créé avec succès !',
                apartment: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'appartement." });
        });
}

// Mettre à jour un appartement
exports.updateApartment = (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    const { surface_area, capacity, address, availability, price_per_night } = req.body;
    Apartment.findByPk(apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).json({ message: "Appartement introuvable !" });
            }
            apartment.surface_area = surface_area;
            apartment.capacity = capacity;
            apartment.address = address;
            apartment.availability = availability;
            apartment.price_per_night = price_per_night;
            return apartment.save();
        })
        .then(result => {
            res.status(200).json({ message: "Appartement mis à jour", apartment: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'appartement." });
        });
}

// Supprimer un appartement
exports.deleteApartment = (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    Apartment.findByPk(apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).json({ message: "Appartement introuvable !" });
            }
            return apartment.destroy();
        })
        .then(result => {
            res.status(200).json({ message: "Appartement supprimé", apartment: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'appartement." });
        });
}
