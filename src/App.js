import React from 'react';
import PathsLogOut from './components/PathsLogOut';
import PathsLogIn from './components/PathsLogIn';
import PathsAdm from './components/PathsAdm';

function App() {
  const authUser = localStorage.getItem('authUser');
  const admin = localStorage.getItem('userRole');

  return (
    <>
      {authUser && admin === "adm" && <PathsAdm />}
      {authUser && admin !== "adm" && <PathsLogIn userautho={authUser} />}
      {!authUser && <PathsLogOut userautho={authUser} />}
    </>
  );
}
export default App;