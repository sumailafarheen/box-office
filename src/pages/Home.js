/* eslint-disable import/extensions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config'


const Home = () => {
     const [ input,setInput ] = useState('');
     const [results, setResults] = useState(null);

     const onSearch = () => {
      apiGet('/search/shows?q=${input}').then(result => {
        setResults(result);
        });
    };
     
    const onInputChange = ev => {
        setInput(ev.target.value);
    };

    const onKeyDown = ev => {
        if (ev.keyCode === 13) {
            onSearch();
        }
    };

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No Results</div>;
        }
        if(results && results.length > 0) {
            return (
                 <div>
               {results.map(item => (
                <div key={item.show.id}>{item.show.name}</div>   
               ))}
            </div>
            );
    }
      return null;
};
     return (
        <MainPageLayout>
        <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
        <button type="button" onClick={onSearch}>Search</button>
        </MainPageLayout>
    );  
     };

export default Home;
