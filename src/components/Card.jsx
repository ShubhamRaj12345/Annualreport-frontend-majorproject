import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ icon, title, link, href }) => (
  <div className="card">
    <div className="icon">
      <FontAwesomeIcon icon={icon} size="2x" />
    </div>
    <h3>{title}</h3>
    <Link to={href}>{link}</Link>
  </div>
);

export default Card;
