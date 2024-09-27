export function formatPostDate(postDate) {
    const now = new Date();
    const date = new Date(postDate);
  
    // Format day of the week, day of month (ordinal), month, and year
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
    const dayOfMonth = date.getDate(); // Day (14th, 21st, etc.)
    const month = date.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, etc.
    const year = date.getFullYear(); // Full year
  
    // Add ordinal suffix for the day of the month
    const dayWithSuffix = dayOfMonth + getOrdinalSuffix(dayOfMonth);
  
    // Calculate the "time ago" part
    const timeDifference = now - date;
    const timeAgo = getTimeAgo(timeDifference);
  
    // Return the formatted date and time ago
    return `${dayOfWeek} ${dayWithSuffix} ${month} ${year} - ${timeAgo}`;
  }
  
  // Helper function to get the ordinal suffix for a day (e.g., 1st, 2nd, 3rd)
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  // Helper function to calculate time ago (in hours, minutes, or days)
  function getTimeAgo(timeDifference) {
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }