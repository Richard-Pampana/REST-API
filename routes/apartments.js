const express = require('express');
const router = require('express').Router();
const controller = require('../controller/apartment');

router.get('/', controller.getApartments);
router.get('/:apartmentId', controller.getApartmentById);
router.post('/', controller.createApartment);
router.put('/:apartmentId', controller.updateApartment);
router.delete('/:apartmentId', controller.deleteApartment);

module.exports = router;
