// main
dynamicLinks();
makeSpoilerLog();
flashWarning();
s_makeHeaderImage();
s_makeTapAltText();

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
    if (flashElem) {
        let flashUrl = flashElem.data || flashElem.src;
        let pb = document.getElementsByClassName("pagebody")[0];
        let warning_text = "由於Adobe Flash播放器已於2021年起停止支援，若此內容無法呈現，請到官方網頁觀看，或是<a id=\"ruffle-import-link\" href=\"#\" onclick=\"importRuffleRS()\">嘗試使用ruffle播放</a>";
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

function s_makeHeaderImage() {
    const sHeaderImg = document.getElementById("s_header");
    if (sHeaderImg === null) {
        return
    }
    sHeaderImg.style.background = "url('" + document.getElementById('s_header_src').src + "')";
}

function s_makeTapAltText() {
    const sHeaderImg = document.getElementById("s_header");
    if (sHeaderImg === null) {
        return
    }
    const tooltipimg = document.getElementById("tooltipimg");
    let isTapAltTextOn = false;
    const tapAltText = document.createElement("div");
    tapAltText.innerHTML = tooltipimg.title;
    tapAltText.style.width = "fit-content";
    tapAltText.style.padding = "0 3px";
    tapAltText.style.margin = "0 auto";
    tapAltText.style.borderRadius = "1px";
    tapAltText.style.fontSize = "0.8em";
    tapAltText.style.color = "#333333";
    tapAltText.style.backgroundColor = "#EFEFEF";
    sHeaderImg.addEventListener('click', () => {
        if (isTapAltTextOn) {
            tooltipimg.removeChild(tooltipimg.lastChild);
        }
        else {
            tooltipimg.appendChild(tapAltText);
        }
        isTapAltTextOn = !isTapAltTextOn;
    });
    // add a message to mobile user
    tooltipimg.innerHTML = tooltipimg.innerHTML.replace(
        "說真的，把你的滑鼠放在圖片上，像這樣。",
        "說真的，把你的滑鼠放在圖片上，像這樣。<span class=\"note\">(如果是行動裝置，就點一下圖片。)</span>"
    )
}

function importRuffleRS() {
    let imported = document.createElement('script');
    imported.src = 'https://unpkg.com/@ruffle-rs/ruffle';
    document.head.appendChild(imported);

    let ruffleImportLink = document.getElementById("ruffle-import-link");
    ruffleImportLink.removeAttribute("onclick");
    ruffleImportLink.removeAttribute("href");

    let flashURL = undefined;
    if (document.getElementsByTagName("object").length == 1) {
        let flashElem = document.getElementsByTagName("object")[0];
        flashURL = flashElem.data;
    }
    else if (document.getElementsByTagName("embed").length == 1) {
        let flashElem = document.getElementsByTagName("embed")[0];
        flashElem.width = "650";
        flashElem.height = "450";
        flashURL = flashElem.src;
    }
    let isTranslatedSWF = false;
    if (flashURL) {
        isTranslatedSWF = flashURL.includes("zhhomestuck.github.io/flash");
    }
    
    let fontSourcesURL = [
        "/assets/font-swfs/courier-new-pixel.swf",
        "/assets/font-swfs/homestuck-fonts.swf",
    ];
    let defaultFonts = {
        "sans": ["Verdana"],
        "serif": ["Times New Roman"],
        "typewriter": ["Courier New"]
    };
    if (isTranslatedSWF) {
        fontSourcesURL = [
            // "/assets/font-swfs/courbdPMingLiU.swf",
            // "/assets/font-swfs/NotoSerifCJKTC.swf",
            "/assets/font-swfs/NotoSansCJKTC.swf",
        ];
        // font fallback is not implemented (2024-02-28)
        defaultFonts = {
            "sans": ["Verdana", "Noto Sans CJK TC Bold"],
            "serif": ["Times New Roman", "新細明體", "Noto Sans CJK TC Bold"],
            "typewriter": ["Courier New", "新細明體", "Noto Sans CJK TC Bold"]
        };
    }
    
    window.RufflePlayer = window.RufflePlayer || {};
    window.RufflePlayer.config = {
        "fontSources": fontSourcesURL,
        "defaultFonts": defaultFonts,
        "logLevel": "info",
    };
}
