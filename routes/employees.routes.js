const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  // res.json(db.employees);
  // req.db
  //   .collection('employees')
  //   .find()
  //   .toArray((err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json(data);
  //   });
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  // res.json(db.employees[Math.floor(Math.random() * db.length)]);
  // req.db
  //   .collection('employees')
  //   .aggregate([{ $sample: { size: 1 } }])
  //   .toArray((err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json(data[0]);
  //   });
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if (!emp) res.status(404).json({ message: 'Not found...' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  // res.json(db.employees.find((item) => item.id == req.params.id));
  // req.db
  //   .collection('employees')
  //   .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else if (!data) res.status(404).json({ message: 'NotFound' });
  //     else res.json(data);
  //   });
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) res.status(404).json({ message: 'Not Found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  // db.employees.push({ id: 3, firstName, lastName });
  // res.json({ message: 'OK' });
  // req.db
  //   .collection('departments')
  //   .insertOne(
  //     { firstname: firstName, lastName: lastName, department: department },
  //     (err) => {
  //       if (err) res.status(500).json({ message: err });
  //       else res.json({ message: 'OK' });
  //     }
  //   );
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  // db = db.employees.map((item) =>
  //   item.id == req.params.id ? { ...item, firstName, lastName } : item
  // );
  // res.json({ message: 'OK' });
  //   req.db.collection('employees').updateOne(
  //     { _id: ObjectId(req.params.id) },
  //     {
  //       $set: {
  //         firstName: firstName,
  //         lastName: lastName,
  //         department: department,
  //       },
  //     },
  //     (err) => {
  //       if (err) res.status(500).json({ message: err });
  //       else res.json({ message: 'OK' });
  //     }
  //   );
  // });
  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      emp.firstName = firstName;
      emp.lastName = lastName;
      emp.department = department;
      await emp.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  // db = db.employees.filter((item) => item.id != req.params.id);
  // res.json({ message: 'OK' });
  // req.db
  //   .collection('employees')
  //   .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json({ message: 'OK' });
  //   });
  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
