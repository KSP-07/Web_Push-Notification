// const { send } = require("express/lib/response")

const publicVapidKey='BDnQD1XJNlCKd7_u1aCYZ8_LubRE-dDEgBs_apkFIhzIb_eu2XyVzQqhsLR8_ZxN5nGTQ0EeVgpEhQ2coWmFFvA'

// check for service worker
// if ("serviceWorker" in navigator) {
//   triggerPushNotification().catch(err => console.error(err));
//   }

  const triggerPush=document.querySelector('.trigger-push');
//register service worker.Register Push,Send Push
async function triggerPushNotification(){
    // Register service worker
    if ("serviceWorker" in navigator){

      console.log('Registring service worker...');
      const register= await navigator.serviceWorker.register('/worker.js',{
        scope:'/'
      })
      console.log('Service Worker Registered..');
      
      //Register Push
      console.log('Registering Push..');
      const subscription=await register.pushManager.subscribe({       //this subscription object need to be send to beckend i.e index.js where we have our subscribe route
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        
      });
      console.log('Push registered..');
      
      //send push notification
      console.log('Sending Push..')
      await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
          'content-type':'application/json'
        }
      });
      console.log('Push sent..')
    }
    else {
      console.error('Service workers are not supported in this browser');
    }
  }

    triggerPush.addEventListener('click', () => {
      triggerPushNotification().catch(error => console.error(error));
    });

    
//function for converting the url safe base64 to a UintBarray as when using vapid key in web app   
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

// module.exports=client