import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import HardwareList from "./components/HardwareList";
import "./App.css";

function App() {
  const adminUser = {
    email: "admin@user.com",
    password: "admin",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [currentList, setCurrentList] = useState(1);
  const productTable = [
    {
      id: 1,
      name: "Apple Iphone 13pro",
      date: "2021-03-10",
      availability: "Available",
    },
    {
      id: 2,
      name: "Apple Iphone 13pro Max",
      date: "2021-03-15",
      availability: "Available",
    },
    {
      id: 3,
      name: "Apple Iphone 12pro",
      date: "2021-03-17",
      availability: "Available",
    },
    {
      id: 4,
      name: "Apple Iphone 12pro Max",
      date: "2021-04-03",
      availability: "Not Available",
    },
    {
      id: 5,
      name: "Apple MacBook pro",
      date: "2020-04-10",
      availability: "Not Available",
    },
    {
      id: 6,
      name: "Apple MacBook 2020",
      date: "2021-05-10",
      availability: "Available",
    },
    {
      id: 7,
      name: "Apple MacBook Air",
      date: "2021-05-20",
      availability: "Available",
    },
    {
      id: 8,
      name: "Samsung ZenBook",
      date: "2021-03-12",
      availability: "Not Available",
    },
    {
      id: 9,
      name: "Samsung Galaxy s22",
      date: "2020-08-11",
      availability: "Available",
    },
    {
      id: 10,
      name: "Samsung Galaxy s22 ultra",
      date: "2021-11-15",
      availability: "Available",
    },
  ];

  const Login = (details) => {
    console.log(details);
    /* TODO: replace to backend here */
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");

      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details do not match!");

      setError("Incorrect data!");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
    setError("");
  };

  const selectHWList = () => {
    setCurrentList(1);
  };
  const selectRentList = () => {
    setCurrentList(2);
  };

  return (
    <div className="App">
      {user.email !== "" ? (
        /* <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div> */
        <table>
          <tr>
            <td>
              {" "}
              <h2>
                Welcome, <span>{user.name}</span>
              </h2>
              <button onClick={selectHWList}>Hardware List</button>
              <button onClick={selectRentList}>Rent List</button>
              <button onClick={Logout}>Logout</button>
            </td>
            <td>
              {currentList === 1 ? (
                <HardwareList prodTable={productTable} />
              ) : (
                <h>Rent List</h>
              )}
            </td>
          </tr>
        </table>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
