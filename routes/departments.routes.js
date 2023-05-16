const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  // req.db
  //   .collection('departments')
  //   .find()
  //   .toArray((err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json(data);
  //   });
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {
  // res.json(db.departments[Math.floor(Math.random() * db.length)]);
  // req.db
  //   .collection('departments')
  //   .aggregate([{ $sample: { size: 1 } }])
  //   .toArray((err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json(data[0]);
  //   });
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'NotFound' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/:id', async (req, res) => {
  // res.json(db.departments.find((item) => item.id == req.params.id));
  // req.db
  //   .collection('departments')
  //   .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
  //     if (err) res.status(500).json({ message: err });
  //     else if (!data) res.status(404).json({ message: 'NotFound' });
  //     else res.json(data);
  //   });
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'NotFound' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/departments', async (req, res) => {
  // const { name } = req.body;
  // // db.departments.push({ id: 3, name });
  // // res.json({ message: 'OK' });
  // req.db.collection('departments').insertOne({ name: name }, (err) => {
  //   if (err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // });

  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  // req.db
  //   .collection('departments')
  //   .updateOne(
  //     { _id: ObjectId(req.params.id) },
  //     { $set: { name: name } },
  //     (err) => {
  //       if (err) res.json(500).json({ message: err });
  //       else res.json({ message: 'OK' });
  //     }
  //   );
  // db = db.departments.map((item) =>
  //   item.id == req.params.id ? { ...item, name } : item
  // );
  // res.json({ message: 'OK' });
  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      dep.name = name;
      await dep.save();
      res.json(await Department.find());
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/departments/:id', async (req, res) => {
  // db = db.departments.filter((item) => item.id != req.params.id);
  // res.json({ message: 'OK' });
  // req.db
  //   .collection('departments')
  //   .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
  //     if (err) res.status(500).json({ message: err });
  //     else res.json({ message: 'OK' });
  //   });
  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json(await Department.find());
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
