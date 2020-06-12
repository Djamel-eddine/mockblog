import React, { useState, useContext, useEffect } from "react";
import EditorJs from "react-editor-js";
import { UserContext } from "../../../resources/states/userContext";
import { Tools } from "./tools";
import axios from "axios";
import "./css/editor.css";
const Editor = (props) => {
  const { user, posts, token } = useContext(UserContext);
  const [Token, setToken] = token;
  const [Posts, setPosts] = posts;
  const [User, setUser] = user;
  const [title, settitle] = useState("No title");
  const [desc, setdesc] = useState("No description");

  /* var editor; */
  const [editor, seteditor] = useState("");

  let outputData;
  const data = {};

  const onTitleChange = (e) => {
    settitle(e.target.value);
    console.log(e.target.style);
  };
  const onDescChange = (e) => {
    setdesc(e.target.value);
    /* e.targer.style.height = e.targer.scrollHeight + "px"; */
    const desc = document.getElementById("description");
    desc.style.height = desc.scrollHeight + "px";
    /* console.log(e.target.style.height); */
  };
  const displayData = async () => {
    /* await editor.save();
    console.log(editor); */

    try {
      outputData = await editor.save();
      outputData.title = title;
      outputData.desc = desc;
      const output = [outputData];

      console.log("Article data: ", output);
      const new_posts_list = output.concat(Posts);
      setPosts(new_posts_list);
      props.history.push(`/profile/user=:${User["username"]}`);
      /*  axios
        .post(
          "https://mockblog-api.herokuapp.com/api/v1/posts",
          {
            user_id: UserContext["_id"],
            title,
            desc,
            body: outputData,
            tags: [],
            published: true,
          },
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            props.history.push(`/confirm`);
          } else {
            alert("there is problem here ");
          }
        })
        .catch((err) => {
          console.log(err);
          const area = document.getElementById("error-area");
          area.innerText = "there a problem";
          area.style.height = "50px";

          setTimeout(() => {
            props.history.push("/register");
          }, 2000);
        }); */
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  return (
    <div className="editor-container">
      <input
        onChange={onTitleChange}
        type="text"
        name="title"
        id="title"
        placeholder="Title"
      />

      <textarea
        onInput={onDescChange}
        name="description"
        id="description"
        cols="30"
        rows="10"
        placeholder="description"
      ></textarea>

      <EditorJs
        /* data={data} */
        autofocus={true}
        tools={Tools}
        instanceRef={async (editorInstance) => {
          // invoked once the editorInstance is ready
          //still some work here must execute

          try {
            seteditor(editorInstance);
            outputData = await editor.save();
          } catch (error) {
            console.log("here we have an error of .save() shit");
          }
        }}
      />
      <button onClick={displayData}>display</button>
    </div>
  );
};

export default Editor;
