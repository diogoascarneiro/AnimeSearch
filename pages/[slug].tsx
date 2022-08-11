import { useRouter } from "next/router";
import Link from "next/link";
import {useGetSingleAnime} from "../utils/useAPIRequests";
import styles from "./[slug].module.scss"



const singleAnime = () => {
  const router = useRouter();
  const {slug} = router.query;

  const {data, error, isLoading, isSuccess, status} = useGetSingleAnime(slug);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
return <div>Error...: {console.log(error)}</div>
  }

  return (
    <div>
      <div><Link href="/">Return to homepage</Link></div>
      <div><img className={styles.coverImage} src={data.Media.coverImage.extraLarge}></img></div>
    <div>
    <p>English title: {data.Media.title.english}</p>
    <p>Japanese title: {data.Media.title.native}</p>
    <p>Number of episodes: {data.Media.episodes}</p>
    <p>Episode duration: {data.Media.duration}</p>
    <p>Genres: {data.Media.genres.map((genre) => <span>{genre} </span> )}</p>
    <p>Average score: {data.Media.averageScore}</p>
    </div>
    </div>
  )
}

export default singleAnime