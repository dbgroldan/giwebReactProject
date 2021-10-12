import React from 'react';
import { Publication } from './Publication';

export function PublicationsList({ publications, toggleSelected }) {
    console.log('publication list --->', publications);
    return (
        <ul>
            {publications.map((publication) => 
                <Publication 
                    key={publication._id} 
                    publication={publication} 
                    toggleSelected={toggleSelected}
                />
            )}
        </ul>
    )
};