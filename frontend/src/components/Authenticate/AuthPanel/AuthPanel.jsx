import React, { useState } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';

const AuthPanel = () => {

    const [accountExist, setAccountExist] = useState(true);

    return (
        <>{accountExist? <Login signUp={setAccountExist} /> : <Register signIn={setAccountExist}/>}</>
    );
}

export default AuthPanel;