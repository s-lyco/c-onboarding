"use client"; // Ensure this code runs on the client-side
import { useEffect, useState } from "react";
import Head from "next/head";

// Declare global interface for Facebook SDK
declare global {
  interface Window {
    fbAsyncInit: () => void; // Initialize function for Facebook SDK
    FB: any; // Facebook SDK object
  }
}

export default function Home() {
  const [fbLoaded, setFbLoaded] = useState(false);

  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (!fbLoaded) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        // Initialize Facebook SDK
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: "650341763798014",
            autoLogAppEvents: true,
            xfbml: true,
            version: "v17.0", // Facebook SDK version
          });
          setFbLoaded(true); // Mark Facebook SDK as loaded
        };
      };

      // Append the script to the document head
      document.head.appendChild(script);
    }
  }, [fbLoaded]);

  // Function to launch WhatsApp signup using Facebook Login
  function launchWhatsAppSignup() {
    if (window.FB) {
      window.FB.login(
        function (response: { authResponse: { accessToken: any } }) {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            console.log(accessToken); // Log the access token
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        {
          scope: "whatsapp_business_management", // Request WhatsApp Business Management permission
          extras: {
            feature: "whatsapp_embedded_signup",
            setup: {
              // ... Prefilled data can go here
            },
          },
        }
      );
    } else {
      console.error("Facebook SDK is not available.");
    }
  }

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
      <Head>
        <title>Facebook-Login</title>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </Head>
      <button
        onClick={launchWhatsAppSignup}
        style={{
          backgroundColor: "#1877f2",
          border: 0,
          borderRadius: 4,
          color: "#fff",
          cursor: "pointer",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 16,
          fontWeight: "bold",
          height: 40,
          padding: "0 24px",
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
}
