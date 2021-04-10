import { useEffect } from 'react'
import React from 'reatc'

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