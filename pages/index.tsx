/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import { useQuery } from "@tanstack/react-query"
import { request, gql, GraphQLClient} from "graphql-request"
import React, { useEffect } from "react";


import {useGetTitles} from "../utils/useAPIRequests";

const Home = () => {
  
const {data, error, isLoading, isSuccess, status} = useGetTitles();

// useEffect(() => {console.log(data, status, error); console.log("ping")}, [data, status]);

if (status === "loading") {
  return <div>Loading...</div>
} 

if (status === "error") {
  return <div>Error...</div>
} 




  return (
    <div>
  {data.Page.media.map((item) => <p>{item.title.english}</p>)}
    </div>
  )
}


export default Home