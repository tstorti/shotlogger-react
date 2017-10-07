import React from "react";
import "./PlayerCard.css";

const PlayerCard = props => (
  <div onClick={() => props.selectPlayer(props.id)} className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content">
      <div>Name: {props.name}</div>
      <div>Position:{props.position}</div> 
      <div>Height:{props.height}</div> 
    </div>
  </div>
);

export default PlayerCard;
