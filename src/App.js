/* eslint-disable jsx-a11y/img-redundant-alt */
import "./App.css";
import React, { useState, useEffect } from 'react';
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react-v1";
import "./welcome.css";

Amplify.configure(awsconfig);

function App() {
  const [maplocation, setMaplocation] = useState('');

  useEffect(() => {
    const getMapLocation = async () =>{
    const mapData = await fetch('http://localhost:5000/maplocations', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const mapjsonData = await mapData.json();
    setMaplocation(mapjsonData);
    console.log(mapjsonData);
  }
    getMapLocation();
  },[])

  return (
    <div className="App">

        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
          <a href="/" className="navbar-brand d-inline-flex px-4 py-3 px-lg-5">
            <h2
              className="m-0"
              style={{
                color: "white",
                display: "inline-flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              Sensegrass
            </h2>
          </a>

          <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <>
                <a
                  href="/"
                  className="nav-item nav-link active"
                  style={{ color: "white" }}
                >
                  Home
                </a>
                <a
                  href="/"
                  className="nav-item nav-link"
                  style={{ color: "white" }}
                >
                  About
                </a>
                <a
                  href="/"
                  className="nav-item nav-link"
                  style={{ color: "white" }}
                >
                  Services
                </a>
                <a
                  href="/"
                  className="nav-item nav-link"
                  style={{ color: "white" }}
                >
                  Contact
                </a>
                <a
                  href="/"
                  className="nav-item nav-link"
                  style={{ Backgroundcolor: "white", color:"white", display: "inline-block", fontSize: "auto" }}
                >
                  <AmplifySignOut />
                </a>
              </>
            </div>
          </div>
        </nav>
      
      <div className="container-fluid">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-8">
              <h2>Welcome Page Sensegrass App</h2>
              <h2>Sensor</h2>
              <h4>{maplocation.country}</h4>
              <h4>{maplocation.city}</h4>
            </div>

            <div className="col-md-4">
              <h2>Weather</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
