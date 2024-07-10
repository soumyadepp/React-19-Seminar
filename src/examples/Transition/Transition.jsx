import React, { useState, useTransition } from "react";
import { BASE_URL } from "../../constants";

const delay2Seconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Delay of 2 seconds completed");
    }, 2000);
  });
};

export const Transition = () => {
  const [id, setId] = useState(1);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await delay2Seconds();
      await fetch(`${BASE_URL}/todos/${id}`)
        .then((res) => res.json())
        .then((json) => setResponse(json))
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    });
  };
  return (
    <div className="page-wrapper start">
      <div className="wrapper">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={async () => await handleSubmit()} disabled={isPending}>
          Fetch todos
        </button>
      </div>
      {error && <p>{error}</p>}
      <div className="flex-grow page-wrapper">
        {isPending ? (
          <div className="skeleton">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        ) : response ? (
          <React.Fragment>
            <div className="page-wrapper items-start start">
              <p className="example-text">
                <b>ID:</b> {response.id}
              </p>
              <p className="example-text">
                <b>Title:</b> {response.title}
              </p>
              <p className="example-text">
                <b>Status:</b> {response.completed ? "Done" : "Pending"}
              </p>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};
