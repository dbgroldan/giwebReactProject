import React from 'react';
import { Publication } from '../publication/Publication';


import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { ListGroup } from 'react-bootstrap';

export function PublicationsList({ publications, toggleSelected }) {
    return (
        <ListGroup className="list-tweets" style={{ maxHeight: '600px' }}  navbarScroll>
            {publications.map(publication => 
                <Publication 
                    key={publication._id} 
                    publication={publication} 
                    toggleSelected={toggleSelected}
                />
            )}
        </ListGroup>
    )
};