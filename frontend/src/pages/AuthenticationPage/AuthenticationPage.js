import React, { useState } from 'react';

import ImageScroll from '../../components/Authenticate/ImageScroll/ImageScroll';
import AuthPanel from '../../components/Authenticate/AuthPanel/AuthPanel';

import './AuthenticationPage.scss'

const AuthenticationPage = () => {
    return(
        <main className='authentication-content'>
            <ImageScroll animate={'down'}/>
            <div className='auth-space'>
                <AuthPanel />
            </div>
            <ImageScroll animate={'up'}/>
        </main>

    )
}

export default AuthenticationPage;