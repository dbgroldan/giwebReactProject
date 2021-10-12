import { useState, useEffect } from 'react';
import { getData } from '../services/requestData';

export function useFilter(filter) {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);
    useEffect(async () => {
        setLoading(true);
        const filterKeys = Object.keys(filter);
        const items = await getData();
        const filteredItems = items.filter(
            item => filterKeys.reduce(
                (accum, currentValue) => accum && filter[currentValue] == item[currentValue], 
                true)
        );
        setPublications(filteredItems);
        setLoading(false);
    }, [filter]);

    return {loading, publications}
};

