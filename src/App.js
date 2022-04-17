import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import HardwareList from "./components/HardwareList";
import RentList from "./components/RentList";
import "./App.css";

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

function App() {
  const adminUser = {
    email: "admin@user.com",
    password: "admin",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [currentList, setCurrentList] = useState(1);
  const [rentListState, setNewRentList] = useState(RentTable());

  function rentCall(item) {
    productTable.forEach((element) => {
      if (element.id === item.id) {
        element.availability = "Not Available";
      }
    });
    //post to server for update product here
    setNewRentList(RentTable());
  }

  function returnCall(item) {
    productTable.forEach((element) => {
      if (element.id === item.id) {
        element.availability = "Available";
      }
    });
    //post to server for update product here
    setNewRentList(RentTable());
  }

  function RentTable() {
    let newProductTable = [];

    productTable.forEach((it) => {
      if (it.availability === "Not Available") {
        newProductTable.push(it);
      }
    });

    return newProductTable;
  }

  const Login = (details) => {
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
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
            <td className="td1">
              {" "}
              <h2>
                Welcome, <span>{user.name}</span>
              </h2>
              <div>
                <button className="HWListBtn" onClick={selectHWList}>
                  Hardware List
                </button>
                <br />
                <button className="RentListBtn" onClick={selectRentList}>
                  Rent List
                </button>
              </div>
              <button className="LogutBtn" onClick={Logout}>
                Logout
              </button>
            </td>
            <td className="td2">
              {currentList === 1 ? (
                <HardwareList prodTable={productTable} rentFunc={rentCall} />
              ) : (
                <RentList prodTable={rentListState} returnFunc={returnCall} />
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
