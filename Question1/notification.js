
const PRIORITY_LEVELS = {
  Placement: 3,
  Result: 2,
  Event: 1
};


class Notification {
  constructor(id, type, message, timestamp) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.timestamp = timestamp; 
  }
}


function generateSampleNotifications() {
 
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

  
  const notifications = notificationData.map(data => {
    const date = new Date(data.timestamp);
    return new Notification(data.id, data.type, data.message, date.getTime());
  });

  return notifications;
}


function sortNotifications(notifications) {
  
  const sortedNotifications = notifications.slice();

 
  sortedNotifications.sort((a, b) => {
   
    const priorityA = PRIORITY_LEVELS[a.type] || 0;
    const priorityB = PRIORITY_LEVELS[b.type] || 0;

   
    if (priorityA !== priorityB) {
      return priorityB - priorityA; 
    }

    
    return b.timestamp - a.timestamp;
  });

  return sortedNotifications;
}


function getTopNotifications(notifications, limit = 10) {
  const sortedNotifications = sortNotifications(notifications);
  
  return sortedNotifications.slice(0, limit);
}


function displayNotifications(notifications) {
  console.log(' NOTIFICATIONS ');

  notifications.forEach((notification, index) => {
    const date = new Date(notification.timestamp);
    const formattedTime = date.toLocaleString();

    console.log(`${index + 1}. [${notification.type}] ${notification.message}`);
    console.log(`   ID: ${notification.id} | Time: ${formattedTime}\n`);
  });

  console.log('===================================\n');
}

function main() {
  
  console.log('+ Notification System Demo\n');
  const allNotifications = generateSampleNotifications();
  console.log(`Total notifications generated: ${allNotifications.length}\n`);

  
  const topNotifications = getTopNotifications(allNotifications, 10);
  console.log('Displaying Top 10 Notifications (sorted by priority & latest first):\n');
  displayNotifications(topNotifications);

  
  console.log('Priority Levels:');
  console.log('- Placement: Priority 3 (Highest)');
  console.log('- Result: Priority 2 (Medium)');
  console.log('- Event: Priority 1 (Lowest)\n');
}


main();

