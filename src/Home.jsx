import React, { useState, useEffect, useRef } from "react";
import { faPlusSquare, faArrowAltCircleRight, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "./Components/Nav";
import Footer from './Components/Footer'
import 'animate.css';

export default function Home() {
  const [joinGame, setJoinGame] = useState(false);
  const [createGame, setCreateGame] = useState(false);

  const joinRef = useRef();


  return (
    <>
      <Nav />
      <section className="section hero is-fullheight-with-navbar is-dark pattern">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">scrytable</h1>
            <h2 className="subtitle">Play MTG online&mdash;no rules, just cards.</h2>
            <div className="columns">
              <div className="column">
                <a className="notification box is-link">
                  <div className="level is-mobile">
                    <div className="level-left">
                      <h1 className="title">Create a game</h1>
                    </div>
                    <div className="level-right">
                      <span className="icon title">
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column">
                <a className="notification box is-success" onClick={() => setJoinGame(true)}>
                  <div className="level is-mobile">
                    <div className="level-left">
                      <h1 className="title">
                        Join a game
                      </h1>
                    </div>
                    <div className="level-right">
                      <span className="icon title">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}