// General Imports
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import NewTripPage from "./pages/NewTripPage/NewTripPage";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage"

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/new" element={<PrivateRoute><NewTripPage /></PrivateRoute>} />
        <Route path="/albums" element={<PrivateRoute><AlbumsPage /></PrivateRoute>} />
        <Route path="/album-detail/:albumId" element={<PrivateRoute><AlbumDetailPage /></PrivateRoute>} />
        <Route path="/*" element={<Navigate to="/home" replace={true}/>} />
      </Routes>
    </div>
  );
}

export default App;
