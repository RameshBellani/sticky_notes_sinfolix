import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useEffect , useState} from 'react';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
     const token = Cookies.get('jwt_token')
     if (token !== undefined) {
       setIsAuthenticated(true);
     }
  }, []);
 
  return (
     <Route
       {...rest}
       render={props =>
         isAuthenticated ? (
           <Component {...props} />
         ) : (
           <Navigate to="/login" />
         )
       }
     />
  );
 };
 

 export default ProtectedRoute
