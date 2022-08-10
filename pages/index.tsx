/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import React, { useState, useEffect } from 'react'
import { setEnvironmentData } from 'worker_threads';

 /*Sample GraphQL anilist query to work with
 
 var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

 {
  Page(perPage: 50) {
    media(isAdult: false) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      startDate {
        year
        month
        day
      }
    }
  }
}

 */

/* Anilist API call code */

var query = `
{
  Page(perPage: 50) {
    media(isAdult: false) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      startDate {
        year
        month
        day
      }
    }
  }
}
`;






const Home = () => {
 
const [fetchedData, setFetchedData] = useState(null);

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        })
    };

// Make the HTTP Api request

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
  setFetchedData(data.data.Page.media);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

useEffect(() => {
fetch(url, options).then(handleResponse)
.then(handleData)
.catch(handleError);
}, []);

useEffect(() => {
  console.log(fetchedData)
}, [fetchedData])
 
if (!fetchedData) {
  return <div>Loading...</div>
} 

  return (
    <div>
     {fetchedData.map((item) => <p>{item.title.english}</p>)}
    </div>
  )
}


export default Home