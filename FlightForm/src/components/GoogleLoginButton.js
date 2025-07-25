// src/components/GoogleLoginButton.js
import React, { useEffect } from 'react';

const GoogleLoginButton = ({ onLoginSuccess }) => {
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '707614508866-nia25ch70egi0mqioivu865ao9psl8jl.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('google-login-btn'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;

    // 토큰을 디코딩해서 사용자 정보 얻기 (간단한 경우)
    const payload = JSON.parse(atob(token.split('.')[1]));
    onLoginSuccess(payload);
  };

  return <div id="google-login-btn"></div>;
};

export default GoogleLoginButton;
