import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = (prop) => {
  const [profileDetails, setProfileDetails] = useState({});

  function getAllDetails() {
    axios
      .get(`https://dummyjson.com/users/${prop.id}`)
      .then((response) => {
        console.log(response);
        setProfileDetails(response.data);
        localStorage.setItem("detail2", JSON.stringify(profileDetails));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("detail2")) || {};

    console.log(data);
    if (Object.keys(data).length > 0) {
      setProfileDetails(data);
    } else {
      getAllDetails();
    }
  }, []);

  return (
    <div id="profile_box">
      <h1 id="profileheading">Profile</h1>
      <div id="img">
        <img src={profileDetails.image} alt="" />
      </div>
      <p>
        <strong>ID:</strong> <span>{profileDetails.id}</span>
      </p>
      <p>
        <strong>FirstName:</strong> <span>{profileDetails.firstName}</span>
      </p>
      <p>
        <strong>LastName:</strong> <span>{profileDetails.lastName}</span>
      </p>
      <p>
        <strong>UserName:</strong> <span>{profileDetails.username}</span>
      </p>
      <p>
        <strong>Password:</strong> <span>{profileDetails.password}</span>
      </p>
      <p>
        <strong>Height:</strong> <span>{profileDetails.height}cms</span>
      </p>
      <p>
        <strong>I.P Adress:</strong> <span>{profileDetails.ip}</span>
      </p>
      <p>
        <strong>Gender:</strong> <span>{profileDetails.gender}</span>
      </p>
      <p>
        <strong>Email:</strong> <span>{profileDetails.email}</span>
      </p>
      <p>
        <strong>Phone No:</strong> <span>{profileDetails.phone}</span>
      </p>
    </div>
  );
};
export default Profile;
