/* START OF ORIGINAL AC_RunActiveContent.js */
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
function ControlVersion(){var e,a;try{e=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version")}catch(s){}if(!e)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),e="WIN 6,0,21,0",a.AllowScriptAccess="always",e=a.GetVariable("$version")}catch(s){}if(!e)try{e=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3")).GetVariable("$version")}catch(s){}if(!e)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),e="WIN 3,0,18,0"}catch(s){}if(!e)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),e="WIN 2,0,0,11"}catch(s){e=-1}return e}function GetSwfVer(){var e=-1;if(null!=navigator.plugins&&0<navigator.plugins.length){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var a=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"",s=navigator.plugins["Shockwave Flash"+a].description.split(" "),r=s[2].split("."),t=r[0],n=r[1],o=s[3];""==o&&(o=s[4]),"d"==o[0]?o=o.substring(1):"r"==o[0]&&0<(o=o.substring(1)).indexOf("d")&&(o=o.substring(0,o.indexOf("d")));e=t+"."+n+"."+o}}else-1!=navigator.userAgent.toLowerCase().indexOf("webtv/2.6")?e=4:-1!=navigator.userAgent.toLowerCase().indexOf("webtv/2.5")?e=3:-1!=navigator.userAgent.toLowerCase().indexOf("webtv")?e=2:isIE&&isWin&&!isOpera&&(e=ControlVersion());return e}function DetectFlashVer(e,a,s){if(versionStr=GetSwfVer(),-1==versionStr)return!1;if(0!=versionStr){isIE&&isWin&&!isOpera?(tempArray=versionStr.split(" "),tempString=tempArray[1],versionArray=tempString.split(",")):versionArray=versionStr.split(".");var r=versionArray[0],t=versionArray[1],n=versionArray[2];if(r>parseFloat(e))return!0;if(r==parseFloat(e)){if(t>parseFloat(a))return!0;if(t==parseFloat(a)&&n>=parseFloat(s))return!0}return!1}}function AC_AddExtension(e,a){return-1!=e.indexOf("?")?e.replace(/\?/,a+"?"):e+a}function AC_Generateobj(e,a,s){var r="";if(isIE&&isWin&&!isOpera){for(var t in r+="<object ",e)r+=t+'="'+e[t]+'" ';for(var t in r+=">",a)r+='<param name="'+t+'" value="'+a[t]+'" /> ';r+="</object>"}else{for(var t in r+="<embed ",s)r+=t+'="'+s[t]+'" ';r+="> </embed>"}document.write(r)}function AC_FL_RunContent(){var e=AC_GetArgs(arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");AC_Generateobj(e.objAttrs,e.params,e.embedAttrs)}function AC_SW_RunContent(){var e=AC_GetArgs(arguments,".dcr","src","clsid:166B1BCA-3F9C-11CF-8075-444553540000",null);AC_Generateobj(e.objAttrs,e.params,e.embedAttrs)}function AC_GetArgs(e,a,s,r,t){var n=new Object;n.embedAttrs=new Object,n.params=new Object,n.objAttrs=new Object;for(var o=0;o<e.length;o+=2){switch(e[o].toLowerCase()){case"classid":break;case"pluginspage":n.embedAttrs[e[o]]=e[o+1];break;case"src":case"movie":e[o+1]=AC_AddExtension(e[o+1],a),n.embedAttrs.src=e[o+1],n.params[s]=e[o+1];break;case"onafterupdate":case"onbeforeupdate":case"onblur":case"oncellchange":case"onclick":case"ondblclick":case"ondrag":case"ondragend":case"ondragenter":case"ondragleave":case"ondragover":case"ondrop":case"onfinish":case"onfocus":case"onhelp":case"onmousedown":case"onmouseup":case"onmouseover":case"onmousemove":case"onmouseout":case"onkeypress":case"onkeydown":case"onkeyup":case"onload":case"onlosecapture":case"onpropertychange":case"onreadystatechange":case"onrowsdelete":case"onrowenter":case"onrowexit":case"onrowsinserted":case"onstart":case"onscroll":case"onbeforeeditfocus":case"onactivate":case"onbeforedeactivate":case"ondeactivate":case"type":case"codebase":case"id":n.objAttrs[e[o]]=e[o+1];break;case"width":case"height":case"align":case"vspace":case"hspace":case"class":case"title":case"accesskey":case"name":case"tabindex":n.embedAttrs[e[o]]=n.objAttrs[e[o]]=e[o+1];break;default:n.embedAttrs[e[o]]=n.params[e[o]]=e[o+1]}}return n.objAttrs.classid=r,t&&(n.embedAttrs.type=t),n}var isIE=-1!=navigator.appVersion.indexOf("MSIE"),isWin=-1!=navigator.appVersion.toLowerCase().indexOf("win"),isOpera=-1!=navigator.userAgent.indexOf("Opera");
/* END OF ORIGINAL AC_RunActiveContent.js */

// Copyright 2018 Viz Media & Homestuck
function vizFlashContentWrapper(){
    for (let i = 0; i < arguments.length; i++){
        arguments[i] = arguments[i].replace(/^\/flash/,"https://www.homestuck.com/flash");
        arguments[i] = arguments[i].replace(/^http:\/\/cdn.mspaintadventures.com\/storyfiles/,"https://www.homestuck.com/flash");
    }
    
    let e=("1"==getUrlParameterByName("fl"));
    //if(DetectFlashVer(9,0,0)||e)
    
    let warning_text = "";    
    if(e) {
        AC_FL_RunContent.apply(null,arguments);
        warning_text = "";
    }
    else{
        let a = AC_GetArgs(arguments,".swf","movie",null,null);
        warning_text = '若要查看原始的呈現內容，請在<nobr>啟用Flash</nobr>的設備下觀看。 (<a href="/'+window.location.pathname.replace(/^\/+/g,"")+'?fl=1">顯示看看</a>)';

        if(a.params.youtubeid) {
            document.write(
                '<div id="o_flash-container">\
                    <iframe id="youtube-flash-iframe"\
                        style="position:absolute;left:0;right:0;top:0;bottom:0;height:100%;width:100%;"\
                        src="https://www.youtube.com/embed/'+a.params.youtubeid+'?modestbranding=1"\
                        frameborder="0" allowfullscreen="allowfullscreen"></iframe>\
                </div>'
            );
        }
        else if(a.params.altimgsrc){
             
            if (a.params.altaudiosrc) {
                let n = document.createElement("audio");
                n.src = a.params.altaudiosrc;
                n.loop = "loop";
                n.controls = "controls";
                document.getElementsByClassName("pagebody")[0].appendChild(n);
            }
            
            let splited_src = a.params.altimgsrc.split("|");
            let splited_href = undefined;
            if (a.params.altimghref) {
                splited_href = a.params.altimghref.split("|");
            }
            
            for (var i in splited_src) {
                let n = '<img src="' + splited_src[i] + '">';
                if (splited_href) n = '<a href="' + splited_href[i] + '">' + n + "</a>";
                document.write(n);
            }
        }
        else {
            AC_FL_RunContent.apply(null,arguments);
            warning_text = ""; // warning is handled by flashWarning()
        }
    }
    if (warning_text != "") {
        let pb = document.getElementsByClassName("pagebody")[0];
        let warning_node = document.createElement("div");
        warning_node.innerHTML = warning_text;
        warning_node.style.fontSize = "11px";
        warning_node.style.padding = "2px";
        warning_node.style.background = window.getComputedStyle(pb ,null).getPropertyValue('background-color');
        warning_node.className = "flash_warning viz_flash_warning"
        pb.parentNode.insertBefore(warning_node, pb);
    }
}
function getUrlParameterByName(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+e+"=([^&#]*)"),t=a.exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}
(function(e){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|android|playbook|silk|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
