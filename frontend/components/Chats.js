const Chats = () => {
    return (
        <div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.callbellSettings = {
                    token: "YyHsMyjm9oSczzf9t5T3uvXQ"};`,
                }}
            />

            <script
                dangerouslySetInnerHTML={{
                    __html: ` (function(){var w=window;var ic=w.callbell;if(typeof ic==="function"){ic('reattach_activator');ic('update',callbellSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Callbell=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://dash.callbell.eu/include/'+window.callbellSettings.token+'.js';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
                }}
            />
            

            <div id='comm100-button-99d23bfd-f03f-4710-a185-0a95e15fdcb0'></div>
            <script
                dangerouslySetInnerHTML={{
                __html: `
                var Comm100API=Comm100API||{};(function(t){function e(e){var a=document.createElement("script"),c=document.getElementsByTagName("script")[0];a.type="text/javascript",a.async=!0,a.src=e+t.site_id,c.parentNode.insertBefore(a,c)}t.chat_buttons=t.chat_buttons||[],t.chat_buttons.push({code_plan:"99d23bfd-f03f-4710-a185-0a95e15fdcb0",div_id:"comm100-button-99d23bfd-f03f-4710-a185-0a95e15fdcb0"}),t.site_id=10004261,t.main_code_plan="99d23bfd-f03f-4710-a185-0a95e15fdcb0",e("https://vue.comm100.com/livechat.ashx?siteId="),setTimeout(function(){t.loaded||e("https://standby.comm100vue.com/livechat.ashx?siteId=")},5e3)})(Comm100API||{})`,
                }}
            ></script>
        </div>
    )
}

export default Chats;