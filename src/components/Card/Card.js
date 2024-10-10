import React from 'react';
import './Card.css';
import { ReactComponent as UrgentPriorityIcon } from '../../assets/icons_FEtask/UrgentPriorityRed.svg';
import { ReactComponent as HighPriorityIcon } from '../../assets/icons_FEtask/HighPriority.svg';
import { ReactComponent as MediumPriorityIcon } from '../../assets/icons_FEtask/MediumPriority.svg';
import { ReactComponent as LowPriorityIcon } from '../../assets/icons_FEtask/LowPriority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/icons_FEtask/No-priority.svg';

const Card = ({ ticket, users, groupBy }) => {
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

  const user = users.find((u) => u.id === ticket.userId);
  const userInitials = user
    ? user.name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
    : 'N/A';

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <div className="card-user">
          {user ? (
            user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.name} Avatar`}
                className="card-user-avatar"
              />
            ) : (
              <div className="card-user-initials">{userInitials}</div>
            )
          ) : (
            <div className="card-user-initials">N/A</div>
          )}
        </div>
      </div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-body">
        {getPriorityIcon(ticket.priority)}
        <span className="card-tag">
          {ticket.tag.map((t) => (
            <span key={t} className="card-tag-label">{t}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Card;
