import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { PopUpProps } from "@customTypes/common";

// NOT FUNCTIONING FIX IT LATER IF TIME ALLOWS
const PopUp = ({ variant, message }: PopUpProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const timeout = 3000

  const getColor = () => {
    switch (variant) {
      case "success":
        return "#23D18B"
      case "error":
        return "#DD6330"
      default:
        return "#118980"
    }
  }

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`absolute top-10 left-10 z-20 h-12 w-44 bg-[${getColor()}] flex justify-between items-center rounded-md`}
        >
          <p>{message}</p>
          <AiOutlineClose onClick={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default PopUp;
