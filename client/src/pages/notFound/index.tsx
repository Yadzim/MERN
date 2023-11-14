import { FC } from "react";
import { Link } from "react-router-dom";
import no_data from 'assets/images/no_data.svg'
import "./style.scss"

const NotFound: FC = (): JSX.Element => {

  console.log("not found");

  return (
    <div className="not-data d-f flex-col" >
      <img src={no_data} alt="No data" />
      <h1>Not found page</h1>
      <Link to='/'><button className="e-btn e-border px-3">Back home</button></Link>
    </div>
  )
}

export default NotFound;