const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log(json[json.length - 1])
    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log('api.js addExercise(data) data is ok : ' + JSON.stringify(data))
    console.log('location.search is okay?:' + location.search)
    const id = location.search.split("=")[1];
    console.log('api.js add exercise id comes? :' + id); // id doesnt come
    console.log(id);
    if (id == 'undefined') {    // why it is string? 'undefined'
      console.log('api/workouts (POST to create new workout)')
      console.log(data);
      const respond2 = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      let json = await respond2.json();
      console.log(json)
      return json;
    } else {
      const res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      let json = await res.json();
      console.log(json)
      return json;
    }
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    console.log('getWorkoutsInRange')
    const res = await fetch(`/api/workoutss/range`, {
      method: 'GET'
    });   // err
    const json = await res.json();
    console.log('getWorkoutsInRange json'+json)
    return json;
  },
};
