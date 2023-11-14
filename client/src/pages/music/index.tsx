import { FC, useEffect } from "react";
import { IMusic } from "model/IMusic";
import "./style.scss"
import AlbomTitle from "./component/albom_title";
import { useAppDispatch, useAppSelector } from "store";
import { GetMusic } from "store/music";


const AllMusic: FC = (): JSX.Element => {

  const { musics: songs, status } = useAppSelector(store => store.music) as { musics: IMusic[], status: string };
  const dispatch = useAppDispatch();

  console.log("music");

  useEffect(() => {
    if (status !== "success" && !songs.length) {
      dispatch(GetMusic());
    }
  }, [])

  return (
    <div className="music-wrapper">

      <div className="header bg-card d-f">
        <h1>All music</h1>
        {/* <h2 className="title"> Lorem ipsum dolor sit amet adipisicing elit?</h2> */}
      </div>
      <div className="category-wrapper mt-5">
        <AlbomTitle title="Categories" url="categories" />
        <div className="categories">
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
          <div className="category bg-card"><p className="category-name"></p></div>
        </div>
      </div>
      <div className="artist-wrapper mt-4">
        <AlbomTitle title="Artists" url="artists" />
        <div className="artists">
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
          <div className="artist bg-card"></div>
        </div>
      </div>
      <div className="podcast-wrapper mt-4">
        <AlbomTitle title="Podcasts" url="podcasts" />
        <div className="podcasts">
          <div className="podcast bg-card"></div>
          <div className="podcast bg-card"></div>
          <div className="podcast bg-card"></div>
        </div>
      </div>

      {/* {songs?.length ? <div className="music_list">
        {
          songs?.length ? songs?.map((item: any, i: number) => (
            <div className="" style={{borderRadius: "1rem"}}>
              <img src={item?.header_image_url} alt="" style={{borderRadius: "1rem"}} />
              <h6>{item?.artist_names} - {item?.title}</h6>

            </div>
          )) : null
        }
      </div> : <Loader />} */}
    </div>
  )
}

export default AllMusic;