import { Route, Routes } from "react-router-dom";
import PublicRoute from "./routeGuard/PublicRoute";
import PrivateRoute from "./routeGuard/PrivateRoute";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import PageNotFound from "./pages/pageNotFound";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
};

export default App;
