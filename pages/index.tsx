/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import {useGetTitles, useGetSingleAnime} from "../utils/useAPIRequests";
import Link
 from "next/link";
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
  {data.Page.media.map((item) => <Link href={`${item.id}`}><div>{item.title.english}</div></Link>)}
    </div>
  )
}


export default Home