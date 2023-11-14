import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const AlbomTitle: FC<{ title: string, url: string }> = ({ title, url }): JSX.Element => {

  return (
    <div className="albom-title">
      <h6 className="title">{title}</h6>
      <Link to={`/${url}`} className="see-more" >See more &nbsp;<FaArrowRight className="see-arrow" /></Link>
    </div>
  )
}

export default AlbomTitle