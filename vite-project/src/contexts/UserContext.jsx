 import {useCallback, useState} from 'react';
 import {useAuthentication, useUser} from '../hooks/apiHooks';
 import {useNavigate} from 'react-router';
 import UserContext from './UserContext.js';


 const UserProvider = ({children}) => {
     const [user, setUser] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const {postLogin} = useAuthentication();
     const {getUserByToken} = useUser();
     const navigate = useNavigate();

     // login, logout and autologin functions are here instead of components
     const handleLogin = useCallback(async (credentials) => {
         try {
             const loginResult = await postLogin(credentials);
             const token = loginResult.token ?? loginResult;
             localStorage.setItem('token', token);
             const userData = await getUserByToken(token);
             setUser(userData.user ?? userData);
             navigate('/');
         } catch (e) {
             localStorage.removeItem('token');
             setUser(null);
             console.error('Login failed:', e);
             throw e;
         }
     }, [getUserByToken, navigate, postLogin]);

     const handleLogout = useCallback(() => {
         localStorage.removeItem('token');
         setUser(null);
         setIsLoading(false);
         navigate('/login');
     }, [navigate]);

     // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
     const handleAutoLogin = useCallback(async () => {
         try {
             const token = localStorage.getItem('token');
             if (!token) {
                 setUser(null);
                 setIsLoading(false);
                 return;
             }
             const userData = await getUserByToken(token);
             setUser(userData.user ?? userData);
         } catch (e) {
             localStorage.removeItem('token');
             setUser(null);
             console.error('Auto-login failed:', e);
         } finally {
             setIsLoading(false);
         }
     }, [getUserByToken]);

     return (
         <UserContext.Provider value={{user, isLoading, handleLogin, handleLogout, handleAutoLogin}}>
             {children}
         </UserContext.Provider>
     );
 };

export default UserProvider;
