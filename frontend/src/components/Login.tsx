import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify({
      username: user,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_BASE_URL || "http://localhost:5000/"}auth/login`,
      requestOptions
    )
      .then((response: Response) => response.json())
      .then((result: { token?: string; msg?: string }) => {
        if (result?.token) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          navigate(`/files/${user}`);
        }
        if (result?.msg) alert(result.msg);
      })
      .catch((error: Error) => console.error(error));
  };

  return (
    <div>
      User:{" "}
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;
