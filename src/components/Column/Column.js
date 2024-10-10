import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import { ReactComponent as AddIcon } from '../../assets/icons_FEtask/add.svg';
import { ReactComponent as ToDoIcon } from '../../assets/icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from '../../assets/icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons_FEtask/in-progress.svg';
import { ReactComponent as CancelledIcon } from '../../assets/icons_FEtask/Cancelled.svg';
import { ReactComponent as UrgentPriorityIcon } from '../../assets/icons_FEtask/UrgentPriorityRed.svg';
import { ReactComponent as HighPriorityIcon } from '../../assets/icons_FEtask/HighPriority.svg';
import { ReactComponent as MediumPriorityIcon } from '../../assets/icons_FEtask/MediumPriority.svg';
import { ReactComponent as LowPriorityIcon } from '../../assets/icons_FEtask/LowPriority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/icons_FEtask/No-priority.svg';

const Column = ({ title, tickets, users, groupBy }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <ToDoIcon className="status-icon" />;
      case 'In progress':
        return <InProgressIcon className="status-icon" />;
      case 'Done':
        return <DoneIcon className="status-icon" />;
      case 'Cancelled':
        return <CancelledIcon className="status-icon" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return <UrgentPriorityIcon className="priority-icon" />;
      case 3:
        return <HighPriorityIcon className="priority-icon" />;
      case 2:
        return <MediumPriorityIcon className="priority-icon" />;
      case 1:
        return <LowPriorityIcon className="priority-icon" />;
      case 0:
        return <NoPriorityIcon className="priority-icon" />;
      default:
        return null;
    }
  };

  const user = users.find((u) => u.name === title);
  const userInitials = user
    ? user.name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
    : 'N/A';
  const isGroupingByPriority = groupBy === 'priority';
  const priorityLevel = isGroupingByPriority ? parseInt(title, 10) : null;

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {isGroupingByPriority ? (
            getPriorityIcon(priorityLevel)
          ) : (
            <>
              {groupBy === 'status' && getStatusIcon(title)}
              {groupBy === 'user' && (
                <div className="user-initials">
                  {userInitials}
                </div>
              )}
            </>
          )}
          <span className="column-title-text">{title}</span>
          <span className="card-count">({tickets.length})</span>
        </div>
        <div className="column-actions">
          <AddIcon />
        </div>
      </div>
      <div className="cards-container">
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
        ))}
      </div>
    </div>
  );
};

export default Column;
