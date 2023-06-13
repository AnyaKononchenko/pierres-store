import React from "react";

import { GoldCoin } from "assets";

const Price = ({ value, styles = '' }: { value: number, styles?: string }) => {
  return <div className={`flex items-center ${styles}`}>
    <img src={GoldCoin} alt="Gold" className="object-contain"/>
    <span>{value}</span>
  </div>;
};

export default Price;
