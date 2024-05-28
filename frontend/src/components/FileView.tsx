import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/";

const FileView: React.FC = () => {
  const { id } = useParams();
  const [userid, setUserid] = useState("");
  const [image, setImage] = useState<any>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("currentUser") || "");
    console.log(item);
    if (item.length > 0) setUserid(item);
    fetch(`${BASE_URL}file/getfile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setUser(data.owner);
        setGuests(data.users);
        if (data.contentType === "image/jpeg") {
          const base64 = btoa(
            new Uint8Array(data.data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setImage(`data:${"image/jpeg"};base64,${base64}`);
        } else if (data.contentType === "text/plain") {
          setText(data.data.data.map((c: any) => String.fromCharCode(c)));
        }
      });
  }, []);

  const handleDownload = () => {
    fetch(`${BASE_URL}file/getfilecontent/${id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  const handleDelete = () => {
    const requestOptions: RequestInit = {
      method: "DELETE",
    };
    fetch(`${BASE_URL}file/delete/${id}`, requestOptions);
  };

  const [editing, setEditing] = useState(false);
  const handleRename = () => {
    setEditing(!editing);
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify({
      name: name,
    });
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}file/updatename/${id}`, requestOptions);
  };

  return (
    <div>
      {userid !== user && !guests.find((item) => item === userid) ? (
        <h1>Permission denied!</h1>
      ) : (
        <div>
          {id}
          <hr></hr>
          <button onClick={handleDownload}>Download</button>
          <hr></hr>
          {image && <img src={image} />}
          {text.length > 0 && <label>{text}</label>}
          {user === userid ? (
            <button onClick={handleDelete}>Del</button>
          ) : (
            <div>
              <button onClick={handleRename}>Rename</button>
              <div>
                {editing && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileView;
