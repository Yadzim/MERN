import { useEffect, useRef } from "react";
import RoutesMiddleware from "routes/routesMiddleware";
import { useAppDispatch, useAppSelector } from "store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { changeSidebar, changeTheme } from "store/ui";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 0,
    },
  },
});

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.ui.theme);
  const sidebar = useAppSelector(state => state.ui.sidebar);

  useEffect(() => {
    const theme_from_store = localStorage.getItem("theme");
    const sidebar_from_store = sessionStorage.getItem("sidebar");
    if(theme_from_store){
      dispatch(changeTheme(theme_from_store))
    }
    if(sidebar_from_store){
      dispatch(changeSidebar(sidebar_from_store))
    }
  },[]);

  return (
    <div data-theme={theme} data-sidebar={sidebar} >
      <QueryClientProvider client={queryClient} >
        <RoutesMiddleware />
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
