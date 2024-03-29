import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

function PrivateRoutes() {
  const [tokenAuthenticated, setTokenAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = new Cookies();
        var TokenSaved = cookies.get('TokenSaved');
        if (TokenSaved == undefined) {TokenSaved="tokenNotSavedYet";}
        alert("TokenSave: "+TokenSaved);
        const res = await axios({url: 'http://127.0.0.1:3000/private/auth',
                                 method: 'post',
                                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                                 data: { token: TokenSaved },
                                 cancelToken: cancelToken.token});
        setTokenAuthenticated(res.data["authenticated"]);
      } catch (error) {
        if (axios.isCancel(error)) {
          setLoading(false);
        }
        setTokenAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? null : tokenAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
