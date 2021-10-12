import { useState, useEffect } from 'react';
import { getData } from '../services/requestData';

export function usePublicationsFilter(filter) {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);
    useEffect(async () => {
        setLoading(true);
        const filterKeys = Object.keys(filter);
        const items = await getData();
        let filteredItems=[];
        if (!filter.date) {
            filteredItems = items.filter(
                item => filterKeys.reduce(
                    (accum, currentValue) => accum && filter[currentValue] == item[currentValue], 
                    true)
            );
        } else {
            filteredItems = items.filter(item => new Date(item.date) == new Date(filter.date));
        }
        setPublications(filteredItems.reverse());
        setLoading(false);
    }, [filter]);

    return {loading, publications}
};

