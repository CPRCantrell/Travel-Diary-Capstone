import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import './HomePage.scss'

import Map from "../../components/Home/Map/Map";

const HomePage = () => {
  const [user, token] = useAuth();
  return (
    <main className="home-content">
      <div className="container">
        <Map />
      </div>
    </main>
  );
};

export default HomePage;
