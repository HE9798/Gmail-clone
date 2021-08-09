import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice'
import { auth } from './firebase';
import './App.css';

import Login from './Login';
import Header from './Header';
import Sidebar from './Sidebar';
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';

function App() {

  const dispatch = useDispatch()

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl
        }))
      } else {

      }
    })
  }, [])

  return (
    <Router>
      { !user ? (<Login />) : (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>
          { sendMessageIsOpen && <SendMail /> }
        </div>
      )}
    </Router>
    
  );
}

export default App;
