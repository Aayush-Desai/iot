import React, { useState } from "react";
import "./LoginRegister.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./NavBar";
import titleimage from "./water_testing.jpg";
import getData from './getData';
import getAws from './getaws';
//import loginUser from "../src/service/auth/signin";
//import { Redirect } from "react-router";
// ----------------------------------------------------

// ----------------------------------------------------

export default function Login() {
  // --------------------------------------

  const [ph, setPh] = useState("");
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [tur1, setTur1] = useState("");
  const [tur2, setTur2] = useState("");
  const [isSet, setVar] = useState(false);
  const [data, setData] = useState("");
  const [page, setPage] = useState(false);
  //const [isSet, setVar] = useState(false);

  const handleDumy = async (e) => {
    e.preventDefault();
    const res=await getData({ph,temp1,temp2,tur1,tur2});
    //if(tok) localStorage.clear();
    //console.log(res);
    if(res.message==="0") setData("Water Not safe");
    else setData("Water is safe");
    console.log(res);
    setVar(true);
  };

  const handleAWS = async (e) =>{
    e.preventDefault();
    const res=await getAws({ph,temp1,temp2,tur1,tur2});
    //if(tok) localStorage.clear();
    //console.log(res);
    if(res.message==="0") setData("Water Not safe");
    else setData("Water is safe");
    console.log(res);
    setVar(true);
  }

  // ---------------------------------------

  return (
    <React.Fragment>
        <div>
          <Navbar />
          <div className="login__container container-fluid row">
            <div className="leftside col-lg-6">
              <div className="class1">
                <div className="">
                  <img
                    alt="titleImage"
                    src={titleimage}
                    className="title__image"
                  ></img>
                </div>

                <div>
                  <p className="login__text">
                    We hope you find the correct details 
                    <br></br>
                  </p>
                </div>
                <div className="result">
                  {!isSet? (
                    <p>Results Will be displayed here</p>
                  ):(
                    <div>
                    {data}
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className="rightside col-lg-5">
              <div className="login__box">
                {/* ------------------------------------------------ */}
                <form className="a__form" >
                  <h3>Enter details</h3>

                  <div className="form-group">
                    <label className="spacing__text"> pH (on a scale of 0-14)</label>
                    <input
                      type="ph"
                      className="formIOT form-control"
                      placeholder="Enter pH"
                      onChange={(e) => setPh(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="spacing__text">Temperature (at 30cm)</label>
                    <input
                      type="temperature"
                      className="form-control"
                      placeholder="Enter temperature"
                      onChange={(e) => setTemp1(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="spacing__text">Temperature (at 60cm)</label>
                    <input
                      type="temperature"
                      className="form-control"
                      placeholder="Enter temperature"
                      onChange={(e) => setTemp2(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="spacing__text">Turbidity (at 30cm)</label>
                    <input
                      type="turbidity"
                      className="form-control"
                      placeholder="Enter turbidity"
                      onChange={(e) => setTur1(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="spacing__text">Turbidity (at 60cm)</label>
                    <input
                      type="turbidity"
                      className="form-control"
                      placeholder="Enter turbidity"
                      onChange={(e) => setTur2(e.target.value)}
                    />
                  </div>
                  <button
                  className="btn btn-primary btn-lg"
                  style={{display:"left",marginRight:"40px",marginBottom:"-30px"}}
                  onClick={handleDumy}
                >
                  Dummy
                </button>
                  <button
                  className="btn btn-primary btn-lg "
                  style={{display:"right",marginBottom:"-30px"}}
                  onClick={handleAWS}
                >
                  AWS
                </button>
                </form>
                
                

                {/* -------------------------------------------------------- */}
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}

