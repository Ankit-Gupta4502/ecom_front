
import {
  RouterProvider
} from "react-router-dom"
import routes from "./Routes"
import ContextProvider from "./Context/ContextProvider";
function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={routes} />
      </ContextProvider>
    </>

  );
}

export default App;
