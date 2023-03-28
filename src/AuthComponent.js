import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // set configuration for the API call
    const configuration = {
      method: "get",
      url: "https://southofsleep-auth.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  // logout
  const logout = () => {
    // destroty the JWT token cookie
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  }


  return (
    <div className="text-center">
      <h1>Auth Component</h1>

      {/* displaying our message from our API call */}
      <h3 className="text-center text-danger">{message}</h3>

      {/* Logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      
    </div>
  );
}