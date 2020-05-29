chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
      // Handle message however you want
    }
    )
});

chrome.runtime.onMessage.addListener(function(request,sender,callback){
    console.log('recieved',request,sender,callback);
    chrome.downloads.download({url:request.url,filename:request.name});
})