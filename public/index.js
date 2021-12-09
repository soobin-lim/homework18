init();

async function init() {
  console.log('index.html location.search:'+location.search)

  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    console.log("index.js has workout:"+workout)
    if (workout) {
      location.search = "?id=" + workout._id;
      console.log('index.html location.search:'+location.search)
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

