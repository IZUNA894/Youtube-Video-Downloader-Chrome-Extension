s = document.createElement('script');
s.src = chrome.extension.getURL('src/app.js');
// s.onload = function (){
//     this.remove();

// }
s.setAttribute('data-ext',chrome.runtime.id);
(document.head || document.documentElement).appendChild(s);

window.addEventListener('message',function(e){
    console.log(e)
    var fn = e.data.name + '.mp4';
    chrome.runtime.sendMessage({name:fn,url:e.data.url},function(event){
        console.log(event);
    })
    //chrome.downloads.download({url:e.data.url,filename:fn})
})

function ping() {
    chrome.runtime.sendMessage('ping', response => {
      if(chrome.runtime.lastError) {
        setTimeout(ping, 1000);
      } else {
        // Do whatever you want, background script is ready now
      }
    });
  }
  
  ping();