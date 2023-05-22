import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import {
  Register,
  Login,
  Routines,
  MyRoutines,
  CreateRoutine,
  LogOut,
  CreateActivity,
  Navbar,
  Activities,
} from "./components";
import { fetchMe } from "./api/Users";
import { fetchActivities } from "./api/Activities";
import { getRoutines } from "./api/Routines";

function App() {
  const [token, setToken] = useState("");

  const [userObj, setUserObj] = useState({});
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    async function getUser() {
      const data = await fetchMe(storedToken);
      setUserObj(data.data);
    }
    if (storedToken) {
      setToken(storedToken);
      getUser();
    }
  }, [token]);

  useEffect(() => {
    const getAllRoutines = async () => {
      const AllRoutines = await getRoutines();
      setRoutines(AllRoutines.reverse());
    };
    getAllRoutines();
  });

  useEffect(() => {
    const getAllActivities = async () => {
      const AllActivities = await fetchActivities();
      setActivities(AllActivities);
    };
    getAllActivities();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/Logout" element={<LogOut />} />
          <Route path="/SignUp" element={<Register setToken={setToken} />} />
          <Route
            path="/CreateRoutine"
            element={
              <CreateRoutine
                setToken={setToken}
                routines={routines}
                setRoutines={setRoutines}
              />
            }
          />
          <Route path="/Activities" element={<Activities />} />
          <Route
            path="/CreateActivity"
            element={
              <CreateActivity
                setToken={setToken}
                activities={activities}
                setActivities={setActivities}
              />
            }
          />
          <Route
            path="/MyRoutines"
            element={
              <MyRoutines
                userObj={userObj}
                routines={routines}
                activities={activities}
              />
            }
          />
          <Route path="/" element={<Routines activities={activities} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;