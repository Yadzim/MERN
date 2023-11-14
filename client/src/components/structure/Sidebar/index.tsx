import IconComponent from "components/Icon";
import { FC } from "react";
import { FaFile } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { public_routes } from "routes";
import './styles.scss';
import { changeTheme } from "store/ui";
import { useAppDispatch } from "store";

const Sidebar: FC = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useAppDispatch();

  return (
    <div className="container-sidebar e-card-shadow">
      {
        public_routes.length ? public_routes?.map((e, i) => e.config.isMenu && (
          <Link to={e?.path} key={i} className={`d-f gap-1 item ${location.pathname === e.path ? "active" : ""}`}>
            {IconComponent(e.config.icon)} &nbsp; <span className="sidebar-name">{e?.name}</span>
          </Link>
        )) : null
      }
      <Link to={'not_found'} className="item d-f gap-1" > <FaFile /> &nbsp; <span className="sidebar-name">Not found</span></Link>
      <hr />
      <div className="sidebar-themes d-f gap-1 mt-2">
        <button onClick={() => dispatch(changeTheme("dark"))} className="e-btn w-full dark">Dark</button>
        <button onClick={() => dispatch(changeTheme("flat"))} className="e-btn w-full flat">Flat</button>
        <button onClick={() => dispatch(changeTheme("blue"))} className="e-btn w-full blue ">Blue</button>
        <button onClick={() => dispatch(changeTheme("light"))} className="e-btn w-full light">Light</button>
      </div>
    </div>
  )
}

export default Sidebar