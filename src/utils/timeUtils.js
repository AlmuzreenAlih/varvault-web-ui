export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  export function calculateTimeElapsed(initialDateTimeString) {
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
  