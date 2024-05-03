import React from 'react';
import { Card } from 'react-bootstrap';

const NavCard = () => {
  return (
    <React.Fragment>
      <div className="p-20">
        <Card className="pro-card">
          <Card.Body className="p-2 text-center">
            <h5 className="text-white">STIN Optimizer</h5>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default NavCard;
