import React, { useContext } from "react";
import { ThemeContext } from "../../utils/context.js";

const Context = () => {
  const theme = useContext(ThemeContext);
  return <div>Giao diện: {theme}</div>;
};

export default Context;
