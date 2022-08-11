import { useQuery } from '@tanstack/react-query';
import { request, gql, GraphQLClient} from "graphql-request"

const ANILIST_QUERY_URL = 'https://graphql.anilist.co';

const client = new GraphQLClient(ANILIST_QUERY_URL, {headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}} );

/* Queries here */
const titlesQuery = gql`{
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
  }`;

  const singleAnimeQuery = gql`
  query ($id: Int) {
    Media(id:$id) {
      id
      title {
          english
          native
        }
      type
      episodes
      duration
      genres
      tags {
        id
      }
      averageScore
      popularity
      countryOfOrigin
    }
  }
`;



/* Custom hooks here */

//Note: the query key needs to be in an array otherwise it won't work

export function useGetTitles() {
  return useQuery(["get-titles"], async () => {
    const titlesData = await client.request(titlesQuery);
    return titlesData;
  })
}

export function useGetSingleAnime(animeId) {
    return useQuery(["singleAnimeData", animeId], async () => {
        const singleAnimeData = await client.request(singleAnimeQuery, {id: animeId});
        return singleAnimeData;
    })
}