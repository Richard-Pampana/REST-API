const express = require('express');
const router = require('express').Router();
const controller = require('../controller/user');

router.get('/', controller.getUsers);
router.get('/:userId', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

module.exports = router;