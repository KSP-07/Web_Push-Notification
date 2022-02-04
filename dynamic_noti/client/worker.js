//service worker
console.log('Service Worker Loaded');

self.addEventListener('push',e=>{
    const data=e.data.json();
    console.log('Push recieved');
    self.registration.showNotification(data.title,{
        body:'Notified by KSP!',
    });
})

// module.exports=Worker