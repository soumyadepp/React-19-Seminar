/* eslint-disable react/no-unescaped-entities */
import { use, Suspense } from "react";
import { JOKE_BASE_URL } from "../../constants";

const delay2Seconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Delay of 2 seconds completed");
    }, 2000);
  });
};

const fetchData = async () => {
  const res = await fetch(`${JOKE_BASE_URL}/jokes/random?category=dev`);
  await delay2Seconds();
  return res.json();
};

const JokeItem = () => {
  const joke = use(fetchData());
  return (
    <div>
      <p className="para-text">
        <b>{joke.value}</b>
      </p>
    </div>
  );
};

const Joke = () => {
  return (
    <div className="screen">
      <h1>Use API</h1>
      <div>
        <h3 className="subheader">How does this work?</h3>
        <p className="para-text">
          React 19 introduces a new API to read resources in render: use. For
          example, you can read a promise with use, and React will Suspend until
          the promise resolves:
        </p>
        <p className="example-text">
          Let's fetch a joke when this component mounts:
        </p>
        <Suspense
          fallback={
            <div className="skeleton">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          }
        >
          <JokeItem />
        </Suspense>
      </div>
    </div>
  );
};
export { Joke as UseExample1 };
