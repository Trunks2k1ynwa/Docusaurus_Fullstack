import React, { createContext, useState } from "react";
import Layout from "@theme/Layout";
import Context from "../../components/hooks/Context.jsx";
import { ThemeContext } from "../../utils/context.js";

export default function UseEffect() {
  const [theme, setTheme] = useState("Black");
  return (
    <ThemeContext.Provider value={theme}>
      <Layout title="Hello" description="Hello React Page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "20px",
          }}
        >
          <Context />
        </div>
      </Layout>
    </ThemeContext.Provider>
  );
}
