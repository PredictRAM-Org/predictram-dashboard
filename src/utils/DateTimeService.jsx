export const getCurrentDate = () => {
  return new Date().toISOString();
};

export const getPriorDate = (days) => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() - days);
  return new Date(priorDate).toISOString();
};

export const getFutureDate = (days) => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() + days);
  return new Date(priorDate).toISOString();
};

export const getFutureDateFromDate = (date, days) => {
  // date in ISO string
  const futureDate = new Date();
  const givenDate = new Date(date);
  futureDate.setDate(givenDate.getDate() + days);
  return `${futureDate.getDate()}/${
    futureDate.getMonth() + 1
  }/${futureDate.getFullYear()}`;
};

// Format: September 10, 2022
export const getLocalDate = (timeStamp) => {
  const _date = new Date(timeStamp);
  const _dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return _date.toLocaleString("default", _dateFormat);
};

// Format: dd/mm/yyyy
export const getLocalNumericDate = (timeStamp) => {
  const _date = new Date(timeStamp);
  const _dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return _date.toLocaleString("default", _dateFormat);
};

export const get12HrTime = (time) => {
  let [hours, minutes] = time.split(":");
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minutes} ${period}`;
};

export const getLocalTime = (timeStamp, is12Hr) => {
  const _time = new Date(timeStamp);
  const _timeFormat = {
    hour: "numeric",
    minute: "numeric",
    hour12: is12Hr, // true => time in 12 hour format
  };
  return _time.toLocaleString("default", _timeFormat);
};

export const getLocalDateTime = (timeStamp, is12Hr) => {
  const _date = getLocalDate(timeStamp);
  const _time = getLocalTime(timeStamp, is12Hr);
  return `${_date}, ${_time}`;
};

export const addSecondsToTime = (time, secondsToAdd) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + secondsToAdd;
  const updatedHours = Math.floor(totalSeconds / 3600) % 24;
  const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
  return `${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
    .toString()
    .padStart(2, "0")}`;
};

export const dataTimeFormatForZoho = (date, time) => {
  // Parse the selected_date and fromTime into a JavaScript Date object
  var dateObject = new Date(date);
  var timeArray = time.value.split(" ");
  var hoursMinutes = timeArray[0].split(":");
  var amPm = timeArray[1];

  dateObject.setHours(
    amPm === "PM" ? parseInt(hoursMinutes[0]) + 12 : parseInt(hoursMinutes[0])
  );
  dateObject.setMinutes(parseInt(hoursMinutes[1]));

  // Helper function to get month abbreviation
  function getMonthAbbreviation(monthIndex) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  }

  // Format the date in the desired format (dd-MMM-yyyy HH:mm:ss)
  var formattedDate = `${dateObject
    .getDate()
    .toString()
    .padStart(2, "0")}-${getMonthAbbreviation(
    dateObject.getMonth()
  )}-${dateObject.getFullYear()} ${dateObject
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateObject
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00`;

  return formattedDate;
};

const today = new Date();

//start on Sunday end on Saturday
const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

export const startOfWeek = firstDay.toISOString();
export const endOfWeek = lastDay.toISOString();

const currentdate = new Date();
export const firstMonthDay = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
);
export const lastMonthDay = new Date(
  currentdate.getFullYear(),
  currentdate.getMonth() + 1,
  0
);

export const convertTo12HourFormat = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const formattedTime = `${hours12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  console.log(timeString);
  return formattedTime;
};
