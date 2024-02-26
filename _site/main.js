
function main() {
    dynamicLinks();
    makeSpoilerLog();
    flashWarning();
}

// Make log
function makeSpoilerLog(parentNode) {
    if (parentNode === undefined) {
        parentNode = document;
    }
    let spoilerDOMs = [].slice.call(parentNode.getElementsByClassName("log-outer-outer"));
    let spoilerDOMThatUseIdAttr = null;
    if (parentNode === document) {
        spoilerDOMThatUseIdAttr = parentNode.getElementById("log-outer-outer"); // beccause I fucked up
    }
    if (spoilerDOMThatUseIdAttr != null) {
        spoilerDOMs.push(spoilerDOMThatUseIdAttr)
    }
    for (let i in spoilerDOMs) {
        let spoilerName = "Pesterlog";
        if ("name" in spoilerDOMs[i].attributes) {
            spoilerName = spoilerDOMs[i].getAttribute("name");
        }
        spoilerDOMs[i].innerHTML = "<div class=\"log-outer\"><div><button type=\"button\"\
            onmouseover=\"this.sv=this.style.backgroundColor;this.style.backgroundColor=\'#777777\';\" \
            onmouseout=\"if(this.sv)this.style.backgroundColor=this.sv;else this.style.backgroundColor=\'\';\"\
            onclick=\"this.parentNode.parentNode.childNodes[1].style.display=\'block\';this.parentNode.style.display=\'none\';return false;\"\
            title=\"點擊以顯示\">Show " + spoilerName + "</button></div><div class=\"spoiler\" style=\"display:none;\">\<div><button type=\"button\"\
            onclick=\"this.parentNode.parentNode.parentNode.childNodes[0].style.display=\'block\';this.parentNode.parentNode.style.display=\'none\';return false;\"\
            title=\"點擊以隱藏\">Hide " + spoilerName + "</button></div><div class=\"log-inner\">" + spoilerDOMs[i].innerHTML + "</div></div></div><!-- LOG END -->";
    }
}

// Warning for manual Flash object on Blogger site
function flashWarning() {
    let flashElem;
    if (document.getElementsByTagName("object").length == 1) {
        flashElem = document.getElementsByTagName("object")[0];
    }
    else if (document.getElementsByTagName("embed").length == 1) {
        flashElem = document.getElementsByTagName("embed")[0];
    }
    if(flashElem){
        let flashUrl = flashElem.data || flashElem.src;
        let pb = document.getElementsByClassName("pagebody")[0];
        let warning_text = "由於Adobe Flash播放器已於2021年起停止支援，若此內容無法呈現，請到官方網頁觀看，或是<a href=\"#\" onclick=\"importRuffleRS()\">嘗試使用ruffle播放</a>";
        let warning_node = document.createElement("div");
        warning_node.innerHTML = warning_text;
        warning_node.style.fontSize = "11px";
        warning_node.style.padding = "2px";
        warning_node.style.background = window.getComputedStyle(pb ,null).getPropertyValue('background-color');
        warning_node.className = "flash_warning translated_flash_warning"
        pb.parentNode.insertBefore(warning_node, pb);
    }
}

function dynamicLinks() {
    // link to offical page
    let urlNumberStart = document.URL.indexOf('00')+2;
    let urlNumberEnd = urlNumberStart + 4;
    let officialLinkNumber = parseInt(document.URL.substring(urlNumberStart,urlNumberEnd)) - 1900;
    document.getElementById("official-link").href =
        "https://www.homestuck.com/story/" + officialLinkNumber.toString();
    // link to homestuckjz
    var isLastPage = document.getElementById("newer-page-link").className == "to-jz";
    if (isLastPage) {
        document.getElementById("newer-page-link").href =
            "https://linzhiyi622.github.io/homestuckjz.GitHub.io/" + (officialLinkNumber+1).toString() + ".html";
    }
}

function importRuffleRS() {
    let imported = document.createElement('script');
    imported.src = 'https://unpkg.com/@ruffle-rs/ruffle';
    document.head.appendChild(imported);
    window.RufflePlayer = window.RufflePlayer || {};
    window.RufflePlayer.config = {
        "fontSources": [
            "/assets/font-swfs/courier-new-pixel.swf",
            "/assets/font-swfs/homestuck-fonts.swf",
            "/assets/font-swfs/homestuck-tc-fonts.swf"
        ],
        "defaultFonts": {
            "sans": ["Arial", "微軟正黑體"],
            "serif": ["Times New Roman", "新細明體"],
            "typewriter": ["Courier New", "新細明體"]
        },
        "logLevel": "info",
    };
}
