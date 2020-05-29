
window.onload = function(){
    console.log("extension is loaded")
var links = window.ytplayer.config.args.player_response;
console.log(links);
//console.log(JSON.parse(links));

links = JSON.parse(links);
links = links.streamingData.adaptiveFormats;
console.log(links);

links = links.map((x)=>{
    var str = '';
    if(!x.url){
    str = x.signatureCipher;
    str = str.split('&');
    str =str[2].slice(4);
    }
    else{
    str = x.url
    }
    return{
        type:x.mimeType,
        quality:x.qualityLabel,
        url:str
    }
})

// links = links.filter((x)=>{
//     var str = x.type;
//     if(str.search('video/mp4') > -1)
//     return true;
//     else 
//     return false;
// })

console.log(links);

function downloadVideo() {
    console.log('download this video');
    var dropdown = document.getElementById('download-video-menu');
    if(dropdown.className.search('shown')>-1){
        dropdown.className = dropdown.className.replace('shown','');
    }
    else{
    dropdown.className += ' shown';
    }


    }

function downloadURI(e) {
    e.preventDefault();
    e.stopPropagation();
    var url = e.currentTarget.getAttribute('href');
    var name = document.getElementsByTagName('title')[0].innerText;
    var data = {url:url,name:name,sender:'YTDL'}
    window.postMessage(data,"*");
    return false;

    }

//ytplayer.config.args.player_response.streamingData.adaptiveFormats;
var container = document.getElementById('top-level-buttons');
var btn = document.createElement('button')
btn.className = 'style-scope ytd-menu-renderer force-icon-button style-default size-default';
btn.setAttribute('role','button');
btn.id = 'download-video';
btn.innerText = 'Download';

var menu = document.createElement('div')
menu.id='download-video-menu';
container.appendChild(menu);
container.appendChild(btn);

btn.addEventListener('click',downloadVideo);
//console.log(parent)

var dropList = document.createElement('ul')
menu.appendChild(dropList);

for (i in links){
    var item = document.createElement('li');
    var itemA = document.createElement('a');

    itemA.innerText = links[i]['quality'];
    itemA.setAttribute('href',links[i]['url']);
    item.addEventListener('click',downloadURI);
    item.appendChild(itemA);
    dropList.appendChild(item);
}
}