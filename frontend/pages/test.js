import React, { useEffect } from 'react'


export default function Index() {
   useEffect(()=>{
    addEventListener('fetch', function(event) {
        // ServiceWorker intercepting a fetch
        console.log(event.request.method)
      });
   },[])
    return (
        <div>HOLAAAAAAA</div>
    )
}