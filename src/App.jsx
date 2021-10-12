import React, { Fragment, useState, useRef, useEffect } from 'react';

//import { useFilter } from './hooks/useFilter';


import { PublicationsList } from './components/PublicationsList';

const LOCAL_STORAGE_KEY = 'publications';
let id = 0; //

export function App(){

    //const { loading, publications } = useFilter({});
    const [publications, setPublications] = useState([]);

    // Add Publications
    const publicationRef = useRef();

    const handlePublicationAdd = () => {
        const publication = publicationRef.current.value;
        if (publication === '') return;        
        setPublications(prevPublications => {
            return [
                ...prevPublications, 
                {
                    _id: id++, 
                    author:'timdx-test', 
                    content: publication, 
                    date:'simple', 
                    __v:0,
                    selected: false
                }
            ]
        });
    };

    if (publicationRef.current) publicationRef.current.value = null;

    // Check Selected Publications
    const toggleSelected = id =>{
        const newPubs= [...publications];
        const publication = newPubs.find(publication => publication._id === id);
        publication.selected = !publication.selected;
        setPublications(newPubs);
    };

    const handleDeleteSelected = () => {
        const newPubs = publications.filter(publication => !publication.selected);
        setPublications(newPubs);
    };

    const handleResendSelected = () => {
        let newPubs = publications.filter(publication => publication.selected);
        newPubs = newPubs.map(publication => {
            publication._id = id++;
            publication.author = 'timdx-resend-test';
            publication.selected = false;
            return publication;
        });
        setPublications(prevPublications => {
            return [
                ...prevPublications,
                ...newPubs
            ]
        });
    };

    // Local Storage Manage
    useEffect(() => {
        const storedPublications = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedPublications) {
            setPublications(storedPublications);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(publications));
    }, [publications]);
    
    return (
    <Fragment>
        <PublicationsList publications={publications} toggleSelected={toggleSelected}/>
        <input ref={publicationRef} type='text' placeholder='New Publication'/>
        <button onClick={handlePublicationAdd}>Send</button>
        <button onClick={handleDeleteSelected}>Delete</button>
        <button onClick={handleResendSelected}>Resend</button>
        <div>There are {publications.length} publications.</div>
    </Fragment>
    )
}