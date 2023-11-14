import Layout from "components/structure/Layout";
import NoLayout from "components/structure/Layout/noLayout";
import NotFound from "pages/notFound";
import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { public_routes } from "routes";

const RoutesMiddleware = () => {

  const createComponent = (Component: any ): ReactNode => {
    return <Component />;
  }

  return (
      <Routes>
        {
          public_routes.length && public_routes.map((element, index) => {
            if (element.submenu.length) {
              return element.submenu.map((childElement, childIndex) => {
                if(childElement.config.structure === "nonlayout") {
                  return <Route key={childIndex} element={<NoLayout>{createComponent(childElement?.component)}</NoLayout>} path={childElement?.path} />
                }
                return <Route key={childIndex} element={<Layout>{createComponent(childElement?.component)}</Layout>} path={childElement?.path} />
            })
            } else {
              if(element.config.structure === "nonlayout") {
                return <Route key={index} element={<NoLayout>{createComponent(element?.component)}</NoLayout>} path={element?.path} />
              }
              return <Route key={index} element={<Layout>{createComponent(element?.component)}</Layout>} path={element?.path} />
            }
          })
        }
        <Route path="*" element={<NoLayout>{<NotFound />}</NoLayout>} />
      </Routes>
  )
}

export default RoutesMiddleware;