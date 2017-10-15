import React from "react";
import "./PlayerCard.css";
import defaultImg from './playercard_default.jpg';

const PlayerCard = props => (
  <div onClick={() => props.selectPlayer(props.id)} className="card">
    <div className="img-container">
      {/* <img alt={props.name} src={props.image} /> */}
      <img alt="" src={defaultImg} />
    </div>
    <div className="content">
      <div className="card-name">{props.name}</div>
      <div className="card-attr">Pos:{" "+props.position}</div> 
      <div className="card-attr">Ht:{" "+props.height}</div>
    </div>
  </div>
);

export default PlayerCard;
