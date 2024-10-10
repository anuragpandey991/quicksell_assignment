import React from 'react';
import Column from '../Column/Column';
import './Board.css';
import { groupTickets } from '../../utils/helpers';

const Board = ({ tickets, users, groupBy, sortBy }) => {
  const groupedData = groupTickets(tickets, users, groupBy, sortBy);

  return (
    <div className="board">
      {Object.keys(groupedData).map((group) => (
        <Column key={group} title={group} tickets={groupedData[group]} users={users} groupBy={groupBy} />
      ))}
    </div>
  );
};

export default Board;
