const router = require("express").Router();
const Workout = require("../models/Workout");
const mongojs = require("mongojs");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})
router.put("/api/workouts/:id", async (req, res) => {
  let body = req.body;
  console.log('router, api/workouts/:id:' + req.params.id + "body content:" + body)
  console.log(body);
  const response = await Workout.updateOne({ _id: mongojs.ObjectId(req.params.id) },
    { $push: { exercises: body } }, (err, docs) => {
      console.log('err:' + err);
      console.log('docs:' + JSON.stringify(docs));
    })
  console.log(response);
  if (response.ok) {
    res.status(200)
  } else {
    res.status(400)
  }

  // .then(dbWorkout => {
  //   res.json(dbWorkout);
  // })
  // .catch(err => {
  //   res.status(400).json(err);
  // });
})
router.get("/api/workouts", ({ body }, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})
router.post("/api/workout/:id", ({ body }, res) => {
  console.log(req.params.id);
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

router.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: '.' })
});

router.get('/stats', (req, res) => {
  res.sendFile('/public/stats.html', { root: '.' })
});

router.get('/exercise', (req, res) => {
  res.sendFile('/public/exercise.html', { root: '.' })
});

module.exports = router;
