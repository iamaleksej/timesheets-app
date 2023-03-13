import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import './Auth.sass';


const Auth = () => {
   const usernameRef = useRef()
   const errRef = useRef()
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [errMessage, setErrorMessage] = useState('')
   const navigate = useNavigate()

   const [login, { isLoading }] = useLoginMutation()
   const dispatch = useDispatch()

   useEffect(() => {
      usernameRef.current.focus()
   }, [])

   useEffect(() => {
      setErrorMessage('')
   }, [username, password])

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const userData = await login({ username, password }).unwrap()
         dispatch(setCredentials({ ...userData, username }))
         window.localStorage.setItem('access_token', JSON.stringify(userData.access))
         window.localStorage.setItem('refresh_token', JSON.stringify(userData.refresh))
         setUsername('')
         setPassword('')
         navigate('/timesheets-app/home')
      } catch (err) {
         console.log(err);
         if (err?.status === 401) {
            setErrorMessage('Не авторизованы')
         } else if (err?.status === 400) {
            setErrorMessage('Неправильные имя или пароль')
         } else {
            setErrorMessage('Ошибка входа')
         }
         errRef.current.focus()
         window.localStorage.removeItem('access_token')
         window.localStorage.removeItem('refresh_token')
      }
   }

   const handleUserNameInput = (e) => setUsername(e.target.value)
   const handlePasswordInput = (e) => setPassword(e.target.value)

   return (
      isLoading ? <h2>Загрузка...</h2> : (
         <div className="auth">
            <form className="auth-form"
               onSubmit={handleSubmit}>
               <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
               <input className="auth-form__item"
                  type="text"
                  id="username"
                  ref={usernameRef}
                  value={username}
                  onChange={handleUserNameInput}
                  autoComplete="off"
                  placeholder="username"
                  required
               />
               <input className="auth-form__item"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordInput}
                  placeholder="password"
                  required
               />
               <button
                  className="auth-form__btn btn">АВТОРИЗАЦИЯ</button>
            </form>
         </div>
      )
   )
}


export default Auth;


