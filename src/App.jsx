import React, { Fragment, useState, useRef, useEffect } from 'react';
import { usePublicationsFilter } from './hooks/useFilter';


import logo from './assets/logo.svg';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Stack } from 'react-bootstrap';

import { PublicationsList } from './components/wall/PublicationsList';
import { setData } from './services/requestData';
import { Footer } from './components/footer/footer';

const LOCAL_STORAGE_KEY = 'publicationsFilter';

function addSelectedItem(elem, selectedIds) {
    const items = selectedIds.filter((item) => item == elem);
    if (items.length == 0) {
        selectedIds.push(elem);
    } else {
        const id = selectedIds.indexOf(items[0]);
        selectedIds.splice(id, 1);
    }
    return selectedIds;
}

export function App(){
    const [selectedIds, setSelectedIds] = useState([]);
    const [filter, setFilter] = useState({});
    const {loading, publications} = usePublicationsFilter(filter);

    const publicationRef = useRef();
    const authorRef = useRef();
    const typeRef = useRef();

    // Add Publication
    const handlePublicationAdd = () => {
        const publication = publicationRef.current.value;
        const author = authorRef.current.value;
        const type = typeRef.current.value;
        if (author && type) {
            if (publication === '') return;
            setData({
                "author": author, 
                "content": publication, 
                "type": type
            });
        }
    };

    /*if (publicationRef.current) publicationRef.current.value = null;
    if (authorRef.current) publicationRef.current.value = null;
    if (typeRef.current) publicationRef.current.value = null;*/

    // Filter Data
    const fieldRef = useRef();
    const valueRef = useRef();
    const handleFilter = () => {
        const field = fieldRef.current.value;
        const value = valueRef.current.value;
        if (field && value) {
            const newFilter = JSON.parse(`{"${field}": "${value}"}`)
            setFilter(newFilter);
        } else {
            setFilter({});
        }
    };

    // Check Selected Publications to Resend
    const toggleSelected = id => {
        publications.find(publication => publication._id === id);
        setSelectedIds(addSelectedItem(id, selectedIds));
    };

    const handleResendSelected = () => {
        let resendPubs = publications.filter(
            publication => selectedIds.includes(publication._id)
        );
        resendPubs.forEach(publication => setData(publication));
    };

    // Local Storage Manage Filter
    useEffect(() => {
        const storedFilter = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedFilter) setFilter(storedFilter);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filter));
    }, [publications]);
  
    return (
    <Container>
        <br/>
        <h1><img src={logo} className="App-logo" alt="logo" />React Tweets</h1>
        <hr/>
        <Stack gap={2} direction="horizontal">
        <PublicationsList publications={publications} toggleSelected={toggleSelected}/>
        <div className="interactContent">
            <h2>Insert</h2>
            <input ref={publicationRef} type='text' placeholder='Publication'/>
            <input ref={authorRef} type='text' placeholder='Author'/>
            <input ref={typeRef} type='text' placeholder='Type'/>
            <Button 
                variant="primary"
                onClick={handlePublicationAdd}
            >Send</Button>{' '}
            <Button 
                variant="dark"
                onClick={handleResendSelected}
            >Resend</Button>{' '}
            <div>There are {publications.length} publications.</div>

            <h2>Filter</h2>
            <input ref={fieldRef} type='text' placeholder='Field'/>
            <input ref={valueRef} type='text' placeholder='Value'/>
            <Button 
                variant="dark"
                onClick={handleFilter}
            >Filter</Button>{' '}
       </div>
       </Stack>
       <Footer/>
    </Container>
    )
}