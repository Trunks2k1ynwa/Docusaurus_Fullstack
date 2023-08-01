import React, { useTransition, useState } from "react";
import Layout from "@theme/Layout";
import { fakeNames } from "../../utils/listName.js";

export default function UseTranstion({ names = fakeNames }) {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");

  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    startTransition(() => setHighlight(value));
  };

  return (
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
        <div>
          <input onChange={changeHandler} value={query} type="text" />
          {names.map((name, i) => (
            <ListItem key={i} name={name} highlight={highlight} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <div>{name}</div>;
  }
  return (
    <div>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + highlight.length)}
      </span>
      {name.slice(index + highlight.length)}
    </div>
  );
}
