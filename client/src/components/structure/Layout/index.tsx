import Sidebar from "components/structure/Sidebar";
import { FC } from "react";
import Header from "../Header";
import "./style.scss";

const Layout: FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {

  console.log("layout");

  return (
    <div className="bg-wrap">
      <div className="layout">
        <Header />
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;