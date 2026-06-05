// notification.js
// This file contains the notification logic for sorting and filtering notifications

// Define priority levels for different notification types
// Higher number = Higher priority
const PRIORITY_LEVELS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

// Class to represent a single Notification
class Notification {
  constructor(id, type, message, timestamp) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.timestamp = timestamp; // Unix timestamp in milliseconds
  }
}

// Function to generate sample notifications for testing
function generateSampleNotifications() {
  // Real-world notification data with timestamps
  const notificationData = [
    { id: 1, type: 'Result', message: 'project-review', timestamp: '2026-06-04 12:35:16' },
    { id: 2, type: 'Placement', message: 'Marriott International Inc. hiring', timestamp: '2026-06-04 20:05:01' },
    { id: 3, type: 'Result', message: 'mid-sem', timestamp: '2026-06-05 03:04:46' },
    { id: 4, type: 'Result', message: 'end-sem', timestamp: '2026-06-04 09:04:31' },
    { id: 5, type: 'Result', message: 'mid-sem', timestamp: '2026-06-04 13:34:16' },
    { id: 6, type: 'Event', message: 'farewell', timestamp: '2026-06-05 02:34:01' },
    { id: 7, type: 'Placement', message: 'Broadcom Inc. hiring', timestamp: '2026-06-04 23:33:46' },
    { id: 8, type: 'Result', message: 'project-review', timestamp: '2026-06-04 12:33:31' },
    { id: 9, type: 'Result', message: 'mid-sem', timestamp: '2026-06-04 19:33:16' },
    { id: 10, type: 'Event', message: 'induction', timestamp: '2026-06-04 09:03:01' },
    { id: 11, type: 'Placement', message: 'Berkshire Hathaway Inc. hiring', timestamp: '2026-06-04 22:02:46' },
    { id: 12, type: 'Event', message: 'induction', timestamp: '2026-06-05 04:02:31' },
    { id: 13, type: 'Event', message: 'cult-fest', timestamp: '2026-06-05 02:02:16' },
    { id: 14, type: 'Event', message: 'farewell', timestamp: '2026-06-05 04:02:01' },
    { id: 15, type: 'Event', message: 'farewell', timestamp: '2026-06-04 09:01:46' },
    { id: 16, type: 'Result', message: 'end-sem', timestamp: '2026-06-05 01:01:31' },
    { id: 17, type: 'Placement', message: 'Marriott International Inc. hiring', timestamp: '2026-06-04 22:01:16' },
    { id: 18, type: 'Placement', message: 'Amazon.com Inc. hiring', timestamp: '2026-06-05 01:01:01' },
    { id: 19, type: 'Placement', message: 'Eli Lilly and Company hiring', timestamp: '2026-06-04 20:30:46' },
    { id: 20, type: 'Event', message: 'farewell', timestamp: '2026-06-05 01:30:31' }
  ];

  // Convert timestamp strings to milliseconds
  const notifications = notificationData.map(data => {
    const date = new Date(data.timestamp);
    return new Notification(data.id, data.type, data.message, date.getTime());
  });

  return notifications;
}

// Function to sort notifications by priority and timestamp
// Priority Rules: Higher priority first, Latest timestamp first
function sortNotifications(notifications) {
  // Use slice to create a copy without modifying the original array
  const sortedNotifications = notifications.slice();

  // Sort using a comparator function
  sortedNotifications.sort((a, b) => {
    // Step 1: Compare by priority (higher number = higher priority)
    const priorityA = PRIORITY_LEVELS[a.type] || 0;
    const priorityB = PRIORITY_LEVELS[b.type] || 0;

    // If priorities are different, sort by priority (descending)
    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Subtract to get descending order
    }

    // Step 2: If priorities are same, compare by timestamp (newer first)
    // Return negative if timestamp_a is greater (newer)
    return b.timestamp - a.timestamp;
  });

  return sortedNotifications;
}

// Function to get the top 10 notifications after sorting
function getTopNotifications(notifications, limit = 10) {
  const sortedNotifications = sortNotifications(notifications);
  // Use slice to get first 'limit' elements
  return sortedNotifications.slice(0, limit);
}

// Function to display notifications in a formatted way
function displayNotifications(notifications) {
  console.log('\n========== NOTIFICATIONS ==========\n');

  notifications.forEach((notification, index) => {
    const date = new Date(notification.timestamp);
    const formattedTime = date.toLocaleString();

    console.log(`${index + 1}. [${notification.type}] ${notification.message}`);
    console.log(`   ID: ${notification.id} | Time: ${formattedTime}\n`);
  });

  console.log('===================================\n');
}

// Main execution
function main() {
  // Step 1: Generate sample notifications
  console.log('📢 Notification System Demo\n');
  const allNotifications = generateSampleNotifications();
  console.log(`Total notifications generated: ${allNotifications.length}\n`);

  // Step 2: Get top 10 notifications
  const topNotifications = getTopNotifications(allNotifications, 10);
  console.log('Displaying Top 10 Notifications (sorted by priority & latest first):\n');
  displayNotifications(topNotifications);

  // Step 3: Show the sorting logic explanation
  console.log('Priority Levels:');
  console.log('- Placement: Priority 3 (Highest)');
  console.log('- Result: Priority 2 (Medium)');
  console.log('- Event: Priority 1 (Lowest)\n');
}

// Run the main function when the file is executed
main();

// Export functions for use in other modules (if using module system)
// Uncomment if using CommonJS or ES6 modules
// module.exports = {
//   Notification,
//   PRIORITY_LEVELS,
//   sortNotifications,
//   getTopNotifications,
//   generateSampleNotifications,
//   displayNotifications
// };