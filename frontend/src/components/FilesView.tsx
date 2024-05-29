import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { SIZE_LIMIT } from "../consts";
import axios from "axios";

const USERS = ["A", "B", "C"];
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/";

const FilesView: React.FC = () => {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const getTotalSize = () => {
    if (!files) return 0;
    let sum = 0;
    for (let i = 0; i < files.length; i++) sum += files[i].size;
    return sum;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].size > SIZE_LIMIT ||
        getTotalSize() + event.target.files[0].size > 10 * SIZE_LIMIT
      ) {
        alert("Choose a smaller file!");
      } else {
        setFile(event.target.files[0]);
      }
    }
  };

  const loadFiles = () => {
    fetch(`${BASE_URL}file/getfiles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file as File);
    axios.post(`${BASE_URL}file/upload/${id}`, formData).then(() => {
      loadFiles();
    });
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const copyToClipboard = (fid: string) => {
    const text = `http://localhost:3000/fileview/${fid}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard: ", err);
      });
  };

  const guests = USERS.filter((item) => item !== id);
  const [guest, setGuest] = useState(guests[0]);

  const handleShare = (fid: string, users: string[]) => {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify({
      usernames: [...users, guest],
    });
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}file/update/${fid}`, requestOptions);
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload File</button>
      <input type="file" onChange={handleFileChange} />
      <label>Share a file with: </label>
      <select
        value={guest}
        onChange={(e) => {
          setGuest(e.target.value);
        }}
      >
        {guests.map((item) => {
          return (
            <option key={uuidv4()} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <hr />
      <div>
        {files.map((file) => {
          return (
            <div key={uuidv4()}>
              {`${file._id} : ${file.size}`}{" "}
              <button
                key={uuidv4()}
                onClick={() => {
                  copyToClipboard(file._id);
                }}
              >
                Copy Link
              </button>
              <button
                key={uuidv4()}
                onClick={() => {
                  handleShare(file._id, file.users);
                }}
              >
                Share
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilesView;
