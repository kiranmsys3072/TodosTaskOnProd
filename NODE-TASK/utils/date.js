const dayFunction = (day) => {
  const date = new Date(day);
  const options = { weekday: "long" };
  const fullDay = date.toLocaleDateString("en-US", options);
  return fullDay;
};

function FormateCustomDate(dateString) {
  // Create a new Date object based on the provided date string or current date
  const date = dateString ? new Date(dateString) : new Date();

  // Get the day, month, and year components
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Get the time component
  const time = date.toLocaleTimeString("en-US", { hour12: false });

  // Format the date in the desired format
  const formattedDate = `${day} ${date.getDate()}, ${year}, ${time}`;

  return formattedDate;
}

module.exports = {
  dayFunction,
  FormateCustomDate,
};
