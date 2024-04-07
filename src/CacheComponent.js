import React, { useState } from 'react';
import axios from 'axios';

const CacheComponent = () => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [expiration, setExpiration] = useState('60');
    const [getResponse, setGetResponse] = useState('');
    const [postResponse, setPostResponse] = useState('');


    const handleGet = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/lruCache/dev/poc/v1/cache/get`, { key });
            let message = "Matching key not found in cache"
            if (response.data.data["key"]) {
                message = `Value:${response.data.data["key"]}`
            }
            setGetResponse(message);
            setPostResponse('')
        } catch (error) {
            console.log(error)
            setGetResponse(JSON.stringify(error));
            setPostResponse('')
        }
    };

    const handleSet = async () => {
        try {
            await axios.post(`http://localhost:8080/lruCache/dev/poc/v1/cache/set`, { key, value, expiration });
            setPostResponse('Key set successfully');
            setGetResponse('')
        } catch (error) {
            console.log(error)
            setPostResponse(JSON.stringify(error));
            setGetResponse('')
        }
    };

    return (
        <div className="container mt-5">
            <h2>LRU Cache</h2>
            <div className="form-group">
                <label htmlFor="key">Key:</label>
                <input type="text" className="form-control" id="key" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="value">Value:</label>
                <input type="text" className="form-control" id="value" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="expiration">Expiration (in seconds):</label>
                <input type="number" className="form-control" id="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
            </div>
            <button className="btn btn-primary mr-2" onClick={handleSet}>Set Key</button>
            <button className="btn btn-primary" onClick={handleGet}>Get Key</button>
            <div className="mt-3">
                <p><strong>Get Response:</strong> {getResponse}</p>
                <p><strong>Post Response:</strong> {postResponse}</p>
            </div>
        </div>
    );
};

export default CacheComponent;
