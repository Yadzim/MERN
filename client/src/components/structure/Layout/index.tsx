import Sidebar from "components/structure/Sidebar";
import { FC, useEffect, useRef } from "react";
import Header from "../Header";
import "./style.scss";
import { useAppSelector } from "store";

const Layout: FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const theme = useAppSelector(state => state.ui.theme);
  const ref: any = useRef(null)

  useEffect(() => {
    const blue_color = getComputedStyle(document.body).getPropertyValue("--blue-bg")
    const dark_color = getComputedStyle(document.body).getPropertyValue("--dark-bg")
    const light_color = getComputedStyle(document.body).getPropertyValue("--light-bg")
    const flat_color = getComputedStyle(document.body).getPropertyValue("--flat-bg")

    const bg_color = theme === "blue" ? blue_color : theme === "dark" ? dark_color : theme === "light" ? light_color : theme === "flat" ? flat_color : "#171B1F";
    const bg = ref?.current;
    if (bg) bg.style.backgroundColor = `${bg_color}dd`;
    // if(bg) bg.className = `layout bg-[${bg_color}ee]`;
  }, [theme]);

  console.log("layout");

  return (
    <div className="bg-wrap">
      <div className="layout" ref={ref}>
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