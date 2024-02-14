// const express = require('express');
// const router = express.Router();
// const reservationController = require('../controller/reservation');

// // Obtenir toutes les réservations avec l'information sur la disponibilité des appartements
// router.get('/', reservationController.getReservationsWithAvailableApartments);

// // Modifier la disponibilité de l'appartement dans la réservation
// router.put('/:reservationId/updateApartmentAvailability', reservationController.updateApartmentAvailability);

// module.exports = router;


const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservation');

// Obtenir toutes les réservations avec l'information sur la disponibilité des appartements
router.get('/', reservationController.getReservationsWithAvailableApartments);

// Modifier la disponibilité de l'appartement dans la réservation
router.put('/:apartmentId', reservationController.updateApartmentAvailabilityById);


// Ajouter une route pour obtenir une réservation spécifique
router.get('/:reservationId', reservationController.getApartmentDetailsForReservation);

module.exports = router;
