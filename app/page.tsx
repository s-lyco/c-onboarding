import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
 <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '650341763798014',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v17.0'
    });
  };
</script>
<script async defer crossorigin="anonymous"
  src="https://connect.facebook.net/en_US/sdk.js">
</script>


      <script>
  // Facebook Login with JavaScript SDK
  function launchWhatsAppSignup() {
    // Launch Facebook login
    FB.login(function (response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        //Use this token to call the debug_token API and get the shared WABA's ID
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'whatsapp_business_management',
      extras: {
        feature: 'whatsapp_embedded_signup',
        setup: {
          ... // Prefilled data can go here
        }
      }
    });
  }
</script>
<div>
<button onclick="launchWhatsAppSignup()"
  style="background-color: #1877f2; border: 0; border-radius: 4px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; height: 40px; padding: 0 24px;">
  Login with Facebook
</button>
      
      </div>
    </main>
  )
}
