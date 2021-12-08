const router = require("express").Router();
const Workout = require("../models/Workout");

router.post("/api/workout", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workout/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workout", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/', (req, res)=>{
  res.sendFile('/public/index.html', { root: '.' })
});

router.get('/stats', (req, res)=>{
  res.sendFile('/public/stats.html', { root: '.' })
});

router.get('/exercise', (req, res)=>{
  res.sendFile('/public/exercise.html', { root: '.' })
});

module.exports = router;
