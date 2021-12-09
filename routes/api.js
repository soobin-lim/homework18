const router = require("express").Router();
const Workout = require("../models/Workout");
var mongoose = require('mongoose'); // connection between mongodb and express
const mongojs = require('mongojs'); // using mongo database

router.post("/api/workouts", ({ body }, res) => {
  console.log('routers api')
  console.log('body:' + body)
  var objectId = mongoose.Types.ObjectId();
  var day = new Date();
  var tmpObj = {
    _id: objectId,
    day: day,
    exercises: []
  }
  console.log(tmpObj)

  Workout.create(tmpObj)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });

})

router.get("/api/workouts/:id", async (req, res) => {
  let body = req.body;
  const response1 = await Workout.findOne({ _id: mongojs.ObjectId(req.params.id) })
  console.log(response1)
})

router.put("/api/workouts/:id", async (req, res) => {
  console.log('put')
  let body = req.body;

  console.log('router, api/workouts/:id:' + req.params.id + "body content:" + body)

  const response = await Workout.findOneAndUpdate({ _id: mongojs.ObjectId(req.params.id) },
    { $push: { exercises: body } })

  console.log(response);

  if (response.ok) {
    res.status(200)
  } else {
    res.status(400)
  }

})
router.get('/api/workouts/range', ({ body }, res) => {

})

//getLastWorkout
//lastWorkout._id, day, totalDuration, exercises.length, exercises
router.get("/api/workouts", ({ body }, res) => {
  
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).then((result)=>{
    console.log(result)
    res.json(result)
  })

  // Workout.find({})
  //   .then(dbWorkout => {
  //     res.json(dbWorkout);
  //   })
  //   .catch(err => {
  //     res.status(400).json(err);
  //   });

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
