
export const PRIORITY_LEVELS = {
  4: { label: 'Urgent', color: '#d32f2f' },      
  3: { label: 'High', color: '#f57c00' },      
  2: { label: 'Medium', color: '#fbc02d' },     
  1: { label: 'Low', color: '#388e3c' },        
  0: { label: 'No Priority', color: '#9e9e9e' } 
};

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return '🔥'; 
    case 3:
      return '⚡️'; 
    case 2:
      return '🔹'; 
    case 1:
      return '⬇️'; 
    default:
      return '❓'; 
  }
};

export const getPriorityColor = (priority) => {
  return PRIORITY_LEVELS[priority]?.color || '#000000';
};

export const groupTickets = (tickets, users, groupBy, sortBy) => {
  let grouped = {};
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; 
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title); 
    }
    return 0;
  });
  if (groupBy === 'status') {
    sortedTickets.forEach(ticket => {
      if (!grouped[ticket.status]) {
        grouped[ticket.status] = [];
      }
      grouped[ticket.status].push(ticket);
    });
  } else if (groupBy === 'user') {
    sortedTickets.forEach(ticket => {
      const user = users.find(u => u.id === ticket.userId);
      const userName = user ? user.name : 'Unassigned';
      if (!grouped[userName]) {
        grouped[userName] = [];
      }
      grouped[userName].push(ticket);
    });
  } else if (groupBy === 'priority') {
    sortedTickets.forEach(ticket => {
      const priorityLabel = PRIORITY_LEVELS[ticket.priority]?.label || 'Unknown';
      if (!grouped[priorityLabel]) {
        grouped[priorityLabel] = [];
      }
      grouped[priorityLabel].push(ticket);
    });
  }

  return grouped;
};