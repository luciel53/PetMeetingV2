import SearchMembers from "../components/SearchMembers";
import Grid from "../components/Grid";
import users from "../components/Users";
import cats from "../components/Cats";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Members() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const reponse = await axios.get('http://127.0.0.1:8000/users/profile/');
      setProfiles(reponse.data);
      console.log(reponse.data);
    } catch (e) {
      console.error('Error fetching profiles', e);
    }
  } 

  return (
    <div>
      <div className="mt-32">
        <SearchMembers />
      </div>
      <div>
        {profiles && profiles.length > 0 ? (
          <Grid items={profiles.map(profile => ({
            name: profile.user.username,
            image: profile.avatar,
            race: profile.location,
          }))} />
        ) : ( <p>Loading profiles...</p> )
          }
      </div>
    </div>
  );
}
