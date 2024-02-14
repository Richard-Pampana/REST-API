const Reservation = require('../model/Reservation');
const Apartment = require('../model/Apartment');

// Obtenir toutes les réservations avec les appartements disponibles
exports.getReservationsWithAvailableApartments = (req, res, next) => {
    Apartment.findAll({ where: { availability: true } })
        .then(apartments => {
            if (!apartments || apartments.length === 0) {
                return res.status(404).json({ message: "Aucun appartement disponible." });
            }
            res.status(200).json({ apartments: apartments });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des appartements." });
        });
}

// Modifier la disponibilité de l'appartement
exports.updateApartmentAvailabilityById = (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    const { availability } = req.body;

    Apartment.findByPk(apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).json({ message: "Appartement introuvable." });
            }

            apartment.availability = availability;
            return apartment.save();
        })
        .then(updatedApartment => {
            res.status(200).json({ message: "Disponibilité de l'appartement mise à jour.", apartment: updatedApartment });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la disponibilité de l'appartement." });
        });
}


exports.getReservationById = (req, res, next) => {
    const reservationId = req.params.reservationId;

    Reservation.findByPk(reservationId)
        .then(reservation => {
            if (!reservation) {
                return res.status(404).json({ message: "Réservation introuvable." });
            }
            res.status(200).json({ reservation: reservation });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la réservation." });
        });
}

// Obtenir les détails de l'appartement associé à une réservation spécifique
exports.getApartmentDetailsForReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;

    Reservation.findByPk(reservationId)
        .then(reservation => {
            if (!reservation) {
                return res.status(404).json({ message: "Réservation introuvable." });
            }

            // Trouver l'appartement associé à la réservation
            Apartment.findByPk(reservation.apartmentId)
                .then(apartment => {
                    if (!apartment) {
                        return res.status(404).json({ message: "Appartement introuvable." });
                    }
                    res.status(200).json({ apartment: apartment });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'appartement." });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la réservation." });
        });
}