import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

export function Publication({ publication, toggleSelected }) {
    const { _id, author, content, date, __v, type, selected } = publication

    // Selected publications
    const handleSelectedClick = () => {
        toggleSelected(_id)
    };

    return (
        <ListGroup.Item>
            <Row>
                <Col sm={2}><Image src="https://picsum.photos/70" roundedCircle /></Col>
                <Col sm={8}>
                    <b>Author:</b> {author}
                    <p><b>Content:</b> {content}</p>
                    <p><b>{type}</b></p>
                    <p><b>date:</b> {date}</p>
                </Col>
                
                <Col sm={4}><input 
                    type="checkbox"
                    checked={selected}
                    onChange={handleSelectedClick}
                />
                </Col>
            </Row>
        </ListGroup.Item>
    )
}