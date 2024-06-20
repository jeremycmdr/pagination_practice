import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "./PaginationPractice.css";

const PaginationPractice = () => {
  const [users, setUsers] = useState([]);
  const [randomUser, setRandomUser] = useState(1);
  const [userLoaded, setUserLoaded] = useState(true);

  const [multipleUserLoaded, setMultipleUserLoaded] = useState(true);
  const [multipleLoaded, setMultipleLoaded] = useState([]);

  const [selectedGender, setSelectedGender] = useState("");
  const [genderUser, setGenderUser] = useState([]);
  const [genderUserLoaded, setGenderUserLoaded] = useState(true);

  console.log(genderUser);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchRandomUsers = async () => {
    setUserLoaded(false);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?page=${randomUser}`
      );

      if (response && response.data && response.data.results) {
        setUsers(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setUserLoaded(true);
    }
  };

  const fetchMultipleRandomUsers = async () => {
    setMultipleUserLoaded(false);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=${inputValue}`
      );

      if (response && response.data && response.data.results) {
        setMultipleLoaded(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setMultipleUserLoaded(true);
    }
  };

  const fetchGenderRandomUser = async () => {
    setGenderUserLoaded(false);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?gender=${selectedGender}`
      );

      if (response && response.data && response.data.results) {
        setGenderUser(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setGenderUserLoaded(true);
    }
  };

  const handleFetchUsersClick = () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    setRandomUser(randomPage);
    fetchRandomUsers();
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <div className="fetch_container">
        <div>Random User</div>
        <button onClick={handleFetchUsersClick}>Fetch Random User</button>
        {userLoaded ? (
          users.map((user, index) => (
            <div key={index}>
              {user.name.first} {user.name.last}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="fetch_container">
        <div>Random {inputValue ? inputValue : 0} Users</div>
        <button onClick={inputValue > 0 ? fetchMultipleRandomUsers : null}>
          Fetch {inputValue ? inputValue : 0} Users
        </button>
        <input type="text" value={inputValue} onChange={handleChange} />
        {multipleUserLoaded ? (
          multipleLoaded.map((user, index) => (
            <div key={index}>
              {index + 1}-{user.name.first} {user.name.last}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="fetch_container">
        <div>
          Random{" "}
          {selectedGender === "male"
            ? "Male"
            : selectedGender === "female"
            ? "Female"
            : ""}{" "}
          User
        </div>
        <div className="gender_selection">
          <button
            onClick={() => handleGenderClick("male")}
            className={selectedGender === "male" ? "selected" : ""}
          >
            Male
          </button>
          <button
            onClick={() => handleGenderClick("female")}
            className={selectedGender === "female" ? "selected" : ""}
          >
            Female
          </button>
        </div>
        <button onClick={fetchGenderRandomUser}>
          Fetch Random{" "}
          {selectedGender === "male"
            ? "Male"
            : selectedGender === "female"
            ? "Female"
            : ""}{" "}
          User
        </button>

        {genderUserLoaded ? (
          genderUser.map((user, index) => (
            <div key={index}>
              {user.name.first} {user.name.last} - {user.gender}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PaginationPractice;
