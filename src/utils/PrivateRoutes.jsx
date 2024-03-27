import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

function PrivateRoutes() {
  const [Token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = new Cookies();
        var TokenSaved = cookies.get('TokenSaved');
        if (TokenSaved == undefined) {TokenSaved=" ";}
        alert("TokenSave: "+TokenSaved);
        const res = await axios.post("http://127.0.0.1:3000/private/auth", {
          token: TokenSaved
        });
        console.log(res.data["authenticated"]);
        // setToken(res.data);
      } catch (error) {
        console.error(error);
        // setToken(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? null : Token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
