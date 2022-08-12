/*
First note - in Next.js pages have to be exported at the end of the file
 rather than directly when their function is created
 */

import { useGetTitles } from "../../utils/useAPIRequests";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";

const AnimeList = () => {
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
    <div className={styles.mainContainer}>
      {data.Page.media.map((item) => (
        <Link key={`${item.id}_${item.title.english}`} href={`/animes/${item.id}`}>
          <div className={styles.animeContainer}>
            <Image src={item.coverImage.extraLarge} alt={item.title.english} width="400" height="600"/>
            <p>{item.title.english}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};



export default AnimeList;
