/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useGetTitles } from "../utils/useAPIRequests";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { request, gql, GraphQLClient } from "graphql-request";



const Home = ({ dehydratedState, didSomething }) => {
  const { data, error, isLoading, isSuccess, status } = useGetTitles();

  // useEffect(() => {console.log(data, status, error); console.log("ping")}, [data, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  /*Note: need to learn more about images in next.js*/

  return (
    <div>
      {() => console.log(getTitles())}

      <div className={styles.mainContainer}>
        {data.Page.media.map((item) => (
          <Link key={`${item.id}_${item.title.english}`} href={`/animes/${item.id}`}>
            <div className={styles.animeContainer}>
              <Image src={item.coverImage.extraLarge} alt={item.title.english} width="400" height="600" />
              <p>{item.title.english}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

async function getTitles() {

  const data = await request({
     url: "https://graphql.anilist.co",
     document: gql`{
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
                    coverImage {
                      extraLarge
                    large
                    medium
                    color
                    }
                  }
                }`,
     variables: "",
     requestHeaders: {
               "Content-Type": "application/json",
               Accept: "application/json",
             },
   })

 return data
 }

export async function getStaticProps() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["get-titles"], getTitles);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      didSomething: true,
    },
  };
}

export default Home;


// export async function getStaticProps() {

//   async function getTitles() {

//     console.log("ping just ran")
//     const ANILIST_QUERY_URL = "https://graphql.anilist.co";
  
//     const client = new GraphQLClient(ANILIST_QUERY_URL, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     });
  
//     const titlesData = await client.request(gql`{
//         Page(perPage: 50) {
//           media(isAdult: false) {
//             id
//             title {
//               romaji
//               english
//               native
//               userPreferred
//             }
//             startDate {
//               year
//               month
//               day
//             }
//             coverImage {
//               extraLarge
//             large
//             medium
//             color
//             }
//           }
//         }`);
//     console.log(titlesData);
//     return titlesData;
//   }
  
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["get-titles"], getTitles);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       didSomething: true,
//     },
//   };
// }