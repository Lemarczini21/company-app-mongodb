const express = require('express');
const router = express.Router();
const ControllerEmployee = require('../controllers/employees.controller');

router.get('/employees', ControllerEmployee.getAll);

router.get('/employees/random', ControllerEmployee.getRandom);

router.get('/employees/:id', ControllerEmployee.getById);

router.post('/employees', ControllerEmployee.addEmp);

router.put('/employees/:id', ControllerEmployee.updateEmp);

router.delete('/employees/:id', ControllerEmployee.deleteEmp);

module.exports = router;
