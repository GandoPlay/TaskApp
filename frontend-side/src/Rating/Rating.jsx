import React from "react";
import "./Rating.css";
import { useEffect, useState } from "react";

function Rating() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function listRating() {
      let url = "http://localhost:3500/items";
      let reponse = await fetch(url);
      let reponseJSON = await reponse.json();
      setData(reponseJSON);
    }
    console.log(data);
    listRating();
  }, []);
  if (!data) {
    return (
      <div>
        <h1>loding...</h1>
      </div>
    );
  }
  const { sorldiersList } = data;
  return (
    <div>
      <h1>Rating</h1>

      <ul className="post-list">
        {sorldiersList.map(post => (
          <li key={post.id}>
            {post.name}-------{post.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rating;
