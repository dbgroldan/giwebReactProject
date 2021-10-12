import React from 'react';

export function Publication({ publication, toggleSelected }) {
    const { _id, author, content, date, __v, selected } = publication

    // Selected publications
    const handleSelectedClick = () => {
        toggleSelected(_id)
    };

    return (
        <div>
            <b>Author:</b> {author}
            <p><b>Content:</b> {content}</p>
            <p><input 
                type="checkbox"
                checked={selected}
                onChange={handleSelectedClick}
            />Selected</p>
        </div>
    )
}