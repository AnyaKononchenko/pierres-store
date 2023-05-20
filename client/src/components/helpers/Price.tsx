import React from "react";
import GoldCoin from "../../assets/Gold.png";

const Price = ({ value, styles = '' }: { value: number, styles?: string }) => {
  return <div className={`flex ${styles}`}>
    <img src={GoldCoin} alt="Gold" />
    <span>{value}</span>
  </div>;
};

export default Price;
