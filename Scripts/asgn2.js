// Difference between TAI and UTC. This value should be
// updated each time the IERS announces a leap second.
var tai_offset = 37;

var timer;
var timeout = 1000;
var h, m, s;
var isShipRunning = false;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function setTime() {
  var time = new Date();
  h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  m = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  document.getElementById("day").innerHTML =
    monthNames[time.getMonth()] + " " + time.getDate();
  document.getElementById("month-text").innerHTML = dayNames[time.getDay()];
}
setTime();
function toggleLight(el) {
 setTime();
  if (!isShipRunning) {
    document.getElementById("mars").classList.add("rotating");
    timer = setInterval(loopFunction, timeout);
    isShipRunning = true;
  } else {
    clearInterval(timer);
    isShipRunning = false;
    document.getElementById("mars").classList.remove("rotating");
  }
  if (document.querySelectorAll(".theme-off").length > 0)
    document.querySelectorAll(".theme-off").forEach(function (item) {
      if (item.classList.contains("theme-off") !== -1)
        item.classList.replace("theme-off", "theme-on");
    });
  else
    document.querySelectorAll(".theme-on").forEach(function (item) {
      if (item.classList.contains("theme-on") !== -1)
        item.classList.replace("theme-on", "theme-off");
    });
}
function openSpaceship() {
  if (document.getElementById("spaceship-power").classList.contains("open")) {
    document.getElementById("spaceship-power").classList.remove("open");
    document.getElementById("spaceship-power-message").innerHTML =
      "TOUCH TO OPEN SPACESHIP";
  } else {
    document.getElementById("spaceship-power").classList.add("open");
    document.getElementById("spaceship-power-message").innerHTML =
      "TOUCH TO CLOSE SPACESHIP";
  }
}

//https://github.com/jtauber/mars-clock/blob/gh-pages/index.html
function h_to_hms(h) {
  var x = h * 3600;
  var hh = Math.floor(x / 3600);
  if (hh < 10) hh = "0" + hh;
  var y = x % 3600;
  var mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = Math.round(y % 60);
  if (ss < 10) ss = "0" + ss;
  return hh + ":" + mm + ":" + ss;
}
function getMarsTime() {
  var date = new Date();
  var millis = date.getTime();
  var jd_ut = 2440587.5 + millis / 8.64e7;
  var jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
  var j2000 = jd_tt - 2451545.0;
  var msd = (j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
  var mtc = (24 * msd) % 24;

  return mtc;
}

document.getElementById("mars-clock").innerHTML = h_to_hms(getMarsTime());
function loopFunction() {
  setTime();
  document.getElementById("mars-clock").innerHTML = h_to_hms(getMarsTime());
}
