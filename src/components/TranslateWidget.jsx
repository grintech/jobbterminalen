// import React, { useEffect } from 'react';

// const TranslateWidget = () => {
//   useEffect(() => {
//     // Check if the function already exists
//     if (window.google && window.google.translate && window.googleTranslateElementInit) {
//       window.googleTranslateElementInit();
//     } else {
//       const interval = setInterval(() => {
//         if (window.google && window.google.translate && window.googleTranslateElementInit) {
//           window.googleTranslateElementInit();
//           clearInterval(interval);
//         }
//       }, 500);
//       return () => clearInterval(interval);
//     }
//   }, []);

//   return <div id="google_translate_element"></div>;
// };

// export default TranslateWidget;
