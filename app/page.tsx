"use client"; // Import the "client" module (if available, this depends on the context)

import { useEffect } from "react"; // Import the "useEffect" hook from the "react" library

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

export default function Home() {
  // Function to initialize the Facebook SDK
  const initFacebookSDK = () => {
    return new Promise<void>((resolve) => {
      // Initialize the Facebook SDK when it's loaded
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Facebook App ID
          autoLogAppEvents: true,
          xfbml: true,
          version: "v17.0", // Specify the SDK version
        });
        resolve(); // Resolve the promise when initialization is complete
      };

      // Load the Facebook SDK asynchronously
      (function (d, s, id) {
        var js: HTMLScriptElement,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js"; // SDK script URL
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    });
  };

  useEffect(() => {
    // Initialize the Facebook SDK when the component is mounted
    const initializeSDK = async () => {
      try {
        await initFacebookSDK(); // Wait for the SDK initialization to complete
      } catch (error) {
        console.error("Error initializing Facebook SDK:", error);
      }
    };

    initializeSDK();
  }, []); // An empty dependency array ensures the effect runs once after the initial render

  const launchWhatsAppSignup = () => {
    // Launch Facebook login with WhatsApp permissions
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          console.log(accessToken); // Log the access token to the console
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "whatsapp_business_management", // Request WhatsApp permissions
        extras: {
          feature: "whatsapp_embedded_signup",
          setup: {
            // ... Prefilled data can go here
          },
        },
      }
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={launchWhatsAppSignup}
        style={{
          backgroundColor: "#1877f2",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "20px",
          padding: "0 24px",
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
}
