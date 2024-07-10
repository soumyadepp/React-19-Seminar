/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const JokeItem = ({ joke }) => {
  return (
    <div>
      <h2>{joke.value}</h2>
    </div>
  );
};

const Joke = () => {
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const res = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await res.json();
        setJoke(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <JokeItem joke={joke} />;
};
export default Joke;
