/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import heroImg from "../assets/heroImg.jpg"
import { useSearchAnimes } from "../utils/useAPIRequests";
import { useQuery } from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";

const searchQuery = gql`
  query ($search: String) {
    Page {
      media(search: $search) {
        id
        title {
          english
        }
      }
    }
  }
`;

const searchAnimes = async (searchTerm) => {
  const ANILIST_QUERY_URL = "https://graphql.anilist.co";

  const client = new GraphQLClient(ANILIST_QUERY_URL, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
  const searchResults = await client.request(searchQuery, {search: searchTerm});
  return searchResults;
}

const Home = () => {
 const [searchBar, setSearchBar] = useState<string>("");
 const [resultsList, setResultsList] = useState([]);
 const {status, data} = useQuery(["searchAnimes", searchBar], () => searchAnimes(searchBar));
 
 useEffect(()=> {
  console.log(data)
  if (data) {
    setResultsList(data.Page.media)
  };
 }, [data])

  if (data) {console.log(resultsList, searchBar)}

  return (
    <div>
      <div className={styles.mainContainer}>
       <div className={styles.heroContainer} style={{backgroundImage: `url(${heroImg.src})`}}>
        <div className={styles.heroHeading}>
          AnimeSearch
        </div>
       </div>
       <div className={styles.searchContainer}>
        <form action="/" method="get">
          <label htmlFor="homeSearch">
            <span className={styles.visuallyHidden}>Search anime database</span>
          </label>
<input type="text" id="homeSearch" placeholder="Search anime database" value={searchBar} onChange={(e)=> {e.preventDefault(); setSearchBar(e.target.value)}}></input>
<div className={styles.resultsContainer}>
  <ul>
   {resultsList ? resultsList.map((item) => <li>{item.title.english}</li>) : <li>No results here!</li>}
  </ul>
</div>
        </form>
       </div>
       <div className={styles.buttonsContainer}>
        <Link href="/animes"><button>All animes</button></Link>
        <Link href="/about"><button>About</button></Link>
       </div>
       </div>
    </div>
  );
};

export default Home;
