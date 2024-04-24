import React, { useEffect } from 'react';

const GoogleTranslateWidget = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
        const googleTranslateScript = document.createElement('script');
        googleTranslateScript.type = 'text/javascript';
        googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(googleTranslateScript);
      }
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWidget;
