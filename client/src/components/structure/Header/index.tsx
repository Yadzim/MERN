import React, { FC } from "react";
import { FaBars, FaRegHeart, FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import logo from "assets/images/MERN.svg"
import { changeSidebar } from "store/ui";
import { useAppDispatch, useAppSelector } from "store";
import "./style.scss"


const Header: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(state => state.ui.sidebar);

  const selectTheme = React.useMemo(() => {
    if (sidebar === "large") return "small";
    if (sidebar === "small") return "none";
    if (sidebar === "none") return "large";
    return "large"
  }, [sidebar]);

  return (
    <div className="header-wrapper e-card-shadow">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="" />
          {/* <FaShoppingCart /> */}
          <h1>MERN</h1>
        </div>
        <button className="e-btn py-1 px-2 d-f ms-4" onClick={() => dispatch(changeSidebar(selectTheme))}>
          <FaBars className="burger me-2" /> Categories
        </button>
      </div>
      <div className="right gap-4">
        <div className="w-[30px] h-[30px] flex-center bg-element rounded-full cursor-pointer hover:text-blue-500"><FaRegHeart /></div>
        <div className="w-[30px] h-[30px] flex-center bg-element rounded-full cursor-pointer hover:text-blue-500"><FaShoppingCart /></div>
        <div className="lang flex-center cursor-pointer">O'zbekcha</div>
        <div className="profile cursor-pointer flex-center hover:text-blue-500">{ false ? <FaUser /> : <FaSignInAlt /> }</div>
      </div>
    </div>
  )
}

export default Header;