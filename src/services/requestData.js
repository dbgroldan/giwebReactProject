const publicationsURL = 'https://saldatweets.herokuapp.com/publications';

const getData = async () => {
    try {
        const response = await fetch(publicationsURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }
    catch (err) {
        console.log('[GET]Fetch request failed:', err);
        return [];
    }
};

const setData = async data => {
    try {
        const response = await fetch(publicationsURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            body: data
            }
        });
        return await response.json();
    }
    catch (err) {
        console.log('[GET]Fetch request failed:', err);
    }
};

export { getData, setData }