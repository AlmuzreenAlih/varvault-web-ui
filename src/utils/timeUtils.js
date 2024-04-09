export function formatDate(dateString) {
  const date = new Date(dateString);

  // Extracting individual date components
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if necessary
  const day = ('0' + date.getDate()).slice(-2); // Adding leading zero if necessary
  const year = date.getFullYear().toString().slice(-2); // Extracting last two digits of the year
  let hour = date.getHours();
  const minute = ('0' + date.getMinutes()).slice(-2); // Adding leading zero if necessary
  const meridiem = hour >= 12 ? 'PM' : 'AM'; // Determining AM or PM
  hour = hour % 12 || 12; // Converting hour to 12-hour format

  // Formatting the date string
  const formattedDate = `${month}-${day}-${year} - ${hour}:${minute}${meridiem}`;

  return formattedDate;
  };

  export function Elapsed(initialDateTimeString) {
    // Convert the initial date string to a Date object
    const initialDateTime = new Date(initialDateTimeString);
  
    // Current date and time
    const currentDateTime = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDateTime - initialDateTime;
  
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    // Convert seconds to minutes, hours, and days
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Calculate remaining hours, minutes, and seconds
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
  
    return [days, remainingHours, remainingMinutes, remainingSeconds];
  }
  
  export function calculateTimeRemaining(initialDateTimeString) {
    // Convert the initial date string to a Date object
    const initialDateTime = new Date(initialDateTimeString);
  
    // Calculate the future date (30 days later)
    const futureDateTime = new Date(initialDateTime);
    futureDateTime.setDate(futureDateTime.getDate() + 30);
  
    // Current date and time
    const currentDateTime = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = futureDateTime - currentDateTime;
  
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    // Convert seconds to minutes, hours, and days
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Calculate remaining hours, minutes, and seconds
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
  
    return [days, remainingHours, remainingMinutes, remainingSeconds];
  }
  