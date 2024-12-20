// zhLyrics
var zhLyrics;
function bt_zhRead_change() {
    let zhLyrics = '';
    const fLyr = event.target.files[0];
    zhLyrics += fLyr.name.replace(".txt","").replace("_","-") + '||';
    if(fLyr != null) {
        const fReader = new FileReader();
        fReader.onload = function(event) {
            zhLyrics += event.target.result;
            navigator.clipboard.writeText(zhLyrics.replaceAll('\r\n', '|'));
            document.getElementById('dv_result').innerText = "Read file OK! Please paste to Google translate!";
            document.getElementById('dv_zhLyr').innerText = zhLyrics.replaceAll('\r\n', '|');
            document.getElementById('dv_zhFilename').innerText = fLyr.name.replace(".txt","").replace("_","-") + '.txt';
        }
        fReader.readAsText(fLyr);
    }
    else {
        zhLyrics = '';
    }
}

var pyLyrics;
async function bt_pyRead_click() {
    pyLyrics = await navigator.clipboard.readText();
    document.getElementById('dv_result').innerText = "Read clipboard text:\n" + pyLyrics;
    document.getElementById('dv_pyLyr').innerText = pyLyrics;
}

function bt_runCmd_click() {
    let zhOrgLyr, pyOrgLyr;
    zhOrgLyr = document.getElementById('dv_zhLyr').innerText;
    pyOrgLyr = document.getElementById('dv_pyLyr').innerText;
    let lyricsFull = '';
    let izh, ipy; izh = ipy = -1;
    let zhArrLyr = [];
    let pyArrLyr = [];
    let idem = 0;
    while(zhOrgLyr.indexOf('|', izh+1) != -1) {
        let nzh, npy;
        nzh = zhOrgLyr.indexOf('|', izh+1);
        npy = pyOrgLyr.indexOf('|', ipy+1);
        zhArrLyr.push(zhOrgLyr.substring(izh+1, nzh).trim());
        pyArrLyr.push(pyOrgLyr.substring(ipy+1, npy).trim());
        izh = nzh; ipy = npy;
    }
    nzh = (zhOrgLyr.indexOf('|', izh+1) != -1) ? zhOrgLyr.indexOf('|', izh+1) : zhOrgLyr.length;
    npy = (pyOrgLyr.indexOf('|', ipy+1) != -1) ? pyOrgLyr.indexOf('|', ipy+1) : pyOrgLyr.length;
    zhArrLyr.push(zhOrgLyr.substring(izh+1, nzh).trim());
    pyArrLyr.push(pyOrgLyr.substring(ipy+1, npy).trim());
    if(zhArrLyr[4] == '') {
        // Co ten nguoi sang tac
        for(let i=0; i<zhArrLyr.length; i++) {
            if(i==0) {
                let zhHyp, pyHyp;
                zhHyp = zhArrLyr[i].search('-');
                pyHyp = pyArrLyr[i].search('-');
                let zhTrack, zhSinger, pyTrack, pySinger;
                if(zhHyp == -1) {
                    zhTrack = zhArrLyr[i];
                }
                else {
                    zhSinger = zhArrLyr[i].substring(0, zhHyp - 1);
                    zhTrack = zhArrLyr[i].substring(zhHyp + 2, zhArrLyr[i].length);
                }
                if(pyHyp == -1) {
                    pyTrack = pyArrLyr[i];
                }
                else {
                    pySinger = pyArrLyr[i].substring(0, pyHyp - 1);
                    pyTrack = pyArrLyr[i].substring(pyHyp + 2, pyArrLyr[i].length);
                }
                if((zhHyp != -1) && (pyHyp != -1)) {
                    lyricsFull += '歌曲: ' + zhTrack + ' ' + String.fromCharCode(12298) +
                    latinpinyin(pyTrack, zhTrack) + String.fromCharCode(12299) + '\n';
                    lyricsFull += '演唱: ' + zhSinger + ' ' + String.fromCharCode(12298) +
                    str_proper(latinpinyin(pySinger, zhSinger)) + String.fromCharCode(12299) + '\n';
                }
                else {
                    lyricsFull += '歌曲: ' + zhTrack + ' ' + String.fromCharCode(12298) +
                    latinpinyin(pyTrack, zhTrack) + String.fromCharCode(12299) + '\n';
                }
            }
            if(i==2) {
                lyricsFull += "作词: " + zhArrLyr[i] + " " + String.fromCharCode(12298) +
                str_proper(latinpinyin(pyArrLyr[i], zhArrLyr[i])) + String.fromCharCode(12299) + '\n';
            }
            if (i==3) {
                lyricsFull += "作曲: " + zhArrLyr[i] + " " + String.fromCharCode(12298) +
                str_proper(latinpinyin(pyArrLyr[i], zhArrLyr[i])) + String.fromCharCode(12299) + '\n';
            }
            if(i>3) {
                if(zhArrLyr[i] == pyArrLyr[i]) lyricsFull += zhArrLyr[i] + '\n';
                else lyricsFull += zhArrLyr[i] + '\n' + gpinyin(pyArrLyr[i]) + '\n';
            }
        }
    }
    else {
        // Khong ten nguoi sang tac
        for(let i=0; i<zhArrLyr.length; i++) {
            if(i==0) {
                let zhHyp, pyHyp;
                zhHyp = zhArrLyr[i].search('-');
                pyHyp = pyArrLyr[i].search('-');
                let zhTrack, zhSinger, pyTrack, pySinger;
                if(zhHyp == -1) {
                    zhTrack = zhArrLyr[i];
                }
                else {
                    zhSinger = zhArrLyr[i].substring(0, zhHyp - 1);
                    zhTrack = zhArrLyr[i].substring(zhHyp + 2, zhArrLyr[i].length);
                }
                if(pyHyp == -1) {
                    pyTrack = pyArrLyr[i];
                }
                else {
                    pySinger = pyArrLyr[i].substring(0, pyHyp - 1);
                    pyTrack = pyArrLyr[i].substring(pyHyp + 2, pyArrLyr[i].length);
                }
                if((zhHyp != -1) && (pyHyp != -1)) {
                    lyricsFull += '歌曲: ' + zhTrack + ' ' + String.fromCharCode(12298) +
                    latinpinyin(pyTrack, zhTrack) + String.fromCharCode(12299) + '\n';
                    lyricsFull += '演唱: ' + zhSinger + ' ' + String.fromCharCode(12298) +
                    str_proper(latinpinyin(pySinger, zhSinger)) + String.fromCharCode(12299) + '\n';
                }
                else {
                    lyricsFull += '歌曲: ' + zhTrack + ' ' + String.fromCharCode(12298) +
                    latinpinyin(pyTrack, zhTrack) + String.fromCharCode(12299) + '\n';
                }
            }
            else {
                if(zhArrLyr[i] == pyArrLyr[i]) lyricsFull += zhArrLyr[i] + '\n';
                else lyricsFull += zhArrLyr[i] + '\n' + gpinyin(pyArrLyr[i]) + '\n';
            }
        }
    }
    document.getElementById("dv_result").innerText = lyricsFull;
}

function bt_saveFile_click() {
    let lyricsFull = document.getElementById("dv_result").innerText;
    const mBlob = new Blob([lyricsFull], { type: 'text/plain' });
    const dLink = document.createElement('a');
    dLink.href = URL.createObjectURL(mBlob);
    dLink.download = document.getElementById('dv_zhFilename').innerText;
    dLink.click();
}

// gPinyin
function chb_latin_change() {
    let lChecked = document.getElementById('chb_latin').checked;
    document.getElementById('dv_zhchar').hidden = !lChecked;
    document.getElementById('ta_zhchar').hidden = !lChecked;
}

function bt_conpinyin_click() {
    let latCheck = document.getElementById('chb_latin').checked;
    let proCheck = document.getElementById('chb_proper').checked;
    let gpyText = document.getElementById('ta_gpinyin').value;
    let zhcText = document.getElementById('ta_zhchar').value;
    let fgpyText = gpinyin(gpyText);
    if(proCheck) fgpyText = str_proper(fgpyText);
    if(latCheck) fgpyText = latinpinyin(fgpyText, zhcText);
    document.getElementById('ta_fpinyin').value = fgpyText;
}

// GOOGLE TRANSLATE FUNCTION SUPPORT
function str_proper(str) {
    let rstr = str.substr(0,1).toUpperCase();
    let capStr = false;
    for(let i=1;i<str.length;i++) {
        if(str.substr(i-1,1) == ' ' || str.substr(i-1,1) == '(') capStr = true;
        if(capStr) {
            rstr += str.substr(i,1).toUpperCase();
            capStr = false;
        }
        else {
            rstr += str.substr(i,1).toLowerCase();
        }
    }
    return rstr;
}

function gpinyin(str) {
    let rstr = str.toLowerCase();
    // Split initials
    rstr = rstr.replaceAll('b',' b');
    rstr = rstr.replaceAll('p',' p');
    rstr = rstr.replaceAll('m',' m');
    rstr = rstr.replaceAll('f',' f');
    rstr = rstr.replaceAll('d',' d');
    rstr = rstr.replaceAll('t',' t');
    rstr = rstr.replaceAll('l',' l');
    rstr = rstr.replaceAll('k',' k');
    rstr = rstr.replaceAll('j',' j');
    rstr = rstr.replaceAll('q',' q');
    rstr = rstr.replaceAll('x',' x');
    rstr = rstr.replaceAll('z',' z');
    rstr = rstr.replaceAll('c',' c');
    rstr = rstr.replaceAll('s',' s');
    rstr = rstr.replaceAll('h',' h');
    rstr = rstr.replaceAll('y',' y');
    rstr = rstr.replaceAll('w',' w');
    // Fix zh, ch, sh initial
    rstr = rstr.replaceAll('z ','z');
    rstr = rstr.replaceAll('c ','c');
    rstr = rstr.replaceAll('s ','s');
    // Prepare any finals for n, g and r initial
    rstr = rstr.replaceAll('ang','aNG');
    rstr = rstr.replaceAll('an','aN');
    rstr = rstr.replaceAll('eng','eNG');
    rstr = rstr.replaceAll('en','eN');
    rstr = rstr.replaceAll('ong','oNG');
    rstr = rstr.replaceAll('ing','iNG');
    rstr = rstr.replaceAll('in','iN');
    rstr = rstr.replaceAll('un','uN');
    rstr = rstr.replaceAll('ün','üN');
    rstr = rstr.replaceAll('āng','āNG');
    rstr = rstr.replaceAll('ān','āN');
    rstr = rstr.replaceAll('ēng','ēNG');
    rstr = rstr.replaceAll('ēn','ēN');
    rstr = rstr.replaceAll('ōng','ōNG');
    rstr = rstr.replaceAll('īng','īNG');
    rstr = rstr.replaceAll('īn','īN');
    rstr = rstr.replaceAll('ūn','ūN');
    rstr = rstr.replaceAll('ǖn','ǖN');
    rstr = rstr.replaceAll('áng','áNG');
    rstr = rstr.replaceAll('án','áN');
    rstr = rstr.replaceAll('éng','éNG');
    rstr = rstr.replaceAll('én','éN');
    rstr = rstr.replaceAll('óng','óNG');
    rstr = rstr.replaceAll('íng','íNG');
    rstr = rstr.replaceAll('ín','íN');
    rstr = rstr.replaceAll('ún','úN');
    rstr = rstr.replaceAll('ǘn','ǘN');
    rstr = rstr.replaceAll('ǎng','ǎNG');
    rstr = rstr.replaceAll('ǎn','ǎN');
    rstr = rstr.replaceAll('ěng','ěNG');
    rstr = rstr.replaceAll('ěn','ěN');
    rstr = rstr.replaceAll('ǒng','ǒNG');
    rstr = rstr.replaceAll('ǐng','ǐNG');
    rstr = rstr.replaceAll('ǐn','ǐN');
    rstr = rstr.replaceAll('ǔn','ǔN');
    rstr = rstr.replaceAll('ǚn','ǚN');
    rstr = rstr.replaceAll('àng','àNG');
    rstr = rstr.replaceAll('àn','àN');
    rstr = rstr.replaceAll('èng','èNG');
    rstr = rstr.replaceAll('èn','èN');
    rstr = rstr.replaceAll('òng','òNG');
    rstr = rstr.replaceAll('ìng','ìNG');
    rstr = rstr.replaceAll('ìn','ìN');
    rstr = rstr.replaceAll('ùn','ùN');
    rstr = rstr.replaceAll('ǜn','ǜN');
    // Check n-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='N' && checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'n' + r2;
        }
    }
    // Check er-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='r' && !checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'R' + r2;
        }
    }
    if(rstr.charAt(rstr.length-1) == 'r') {
        rstr = rstr.substr(0,rstr.length - 1) + 'R';
    }
    // Check ng-bug
    for(var i=1;i<rstr.length-2;i++) {
        if(rstr.substr(i,2)=='NG' && checkfinals(rstr.charAt(i+2))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+2,rstr.length-i-2);
            rstr = r1 + 'Ng' + r2;
        }
    }
    // Split n, g, r initial
    rstr = rstr.replaceAll('n',' n');
    rstr = rstr.replaceAll('g',' g');
    rstr = rstr.replaceAll('r',' r');
    rstr = rstr.replaceAll('R','r');
    // Fix any finals of n, g and r
    rstr = rstr.replaceAll('aNG','ang');
    rstr = rstr.replaceAll('aN','an');
    rstr = rstr.replaceAll('eNG','eng');
    rstr = rstr.replaceAll('eN','en');
    rstr = rstr.replaceAll('eR','er');
    rstr = rstr.replaceAll('oNG','ong');
    rstr = rstr.replaceAll('iNG','ing');
    rstr = rstr.replaceAll('iN','in');
    rstr = rstr.replaceAll('uN','un');
    rstr = rstr.replaceAll('üN','ün');
    rstr = rstr.replaceAll('āNG','āng');
    rstr = rstr.replaceAll('āN','ān');
    rstr = rstr.replaceAll('ēNG','ēng');
    rstr = rstr.replaceAll('ēN','ēn');
    rstr = rstr.replaceAll('ēR','ēr');
    rstr = rstr.replaceAll('ōNG','ōng');
    rstr = rstr.replaceAll('īNG','īng');
    rstr = rstr.replaceAll('īN','īn');
    rstr = rstr.replaceAll('ūN','ūn');
    rstr = rstr.replaceAll('ǖN','ǖn');
    rstr = rstr.replaceAll('áNG','áng');
    rstr = rstr.replaceAll('áN','án');
    rstr = rstr.replaceAll('éNG','éng');
    rstr = rstr.replaceAll('éN','én');
    rstr = rstr.replaceAll('éR','ér');
    rstr = rstr.replaceAll('óNG','óng');
    rstr = rstr.replaceAll('íNG','íng');
    rstr = rstr.replaceAll('íN','ín');
    rstr = rstr.replaceAll('úN','ún');
    rstr = rstr.replaceAll('ǘN','ǘn');
    rstr = rstr.replaceAll('ǎNG','ǎng');
    rstr = rstr.replaceAll('ǎN','ǎn');
    rstr = rstr.replaceAll('ěNG','ěng');
    rstr = rstr.replaceAll('ěN','ěn');
    rstr = rstr.replaceAll('ěR','ěr');
    rstr = rstr.replaceAll('ǒNG','ǒng');
    rstr = rstr.replaceAll('ǐNG','ǐng');
    rstr = rstr.replaceAll('ǐN','ǐn');
    rstr = rstr.replaceAll('ǔN','ǔn');
    rstr = rstr.replaceAll('ǚN','ǚn');
    rstr = rstr.replaceAll('àNG','àng');
    rstr = rstr.replaceAll('àN','àn');
    rstr = rstr.replaceAll('èNG','èng');
    rstr = rstr.replaceAll('èN','èn');
    rstr = rstr.replaceAll('èR','èr');
    rstr = rstr.replaceAll('òNG','òng');
    rstr = rstr.replaceAll('ìNG','ìng');
    rstr = rstr.replaceAll('ìN','ìn');
    rstr = rstr.replaceAll('ùN','ùn');
    rstr = rstr.replaceAll('ǜN','ǜn');
    rstr = rstr.replaceAll(String.fromCharCode(0x27),' ');
    rstr = rstr.replaceAll('( ', '(');
    rstr = rstr.replaceAll('  ',' ');
    return rstr.trim();
}

function latinpinyin(pinyin, hanyu) {
    let pinLower = pinyin.toLowerCase();
    let latWords = [];
    let latStart = false;
    let latWord = '';
    for(let i=0; i<hanyu.length; i++) {
        let hChar = hanyu.charCodeAt(i);
        if(((hChar >= 65) && (hChar <= 90)) || ((hChar >= 97) && (hChar <= 122))) {
            // Latin character
            if(!latStart) {
                latStart = true;
            }
            latWord += hanyu.charAt(i).toLowerCase();
        }
        else {
            // Chinese character
            if(latStart) {
                latWords.push(latWord);
            }
            latWord = '';
            latStart = false;
        }
        if((i==hanyu.length-1) && latStart) {
            latWords.push(latWord);
            latWord = '';
            latStart = false;
        }
    }
    for(let i=0; i<latWords.length; i++) {
        pinLower = pinLower.replaceAll(latWords[i], '[' + i + ']');
    }
    pinLower = pinLower.replaceAll('[',' [');
    pinLower = pinLower.replaceAll('  ', ' ');
    pinLower = gpinyin(pinLower);
    for(let i=0; i<latWords.length; i++) {
        pinLower = pinLower.replaceAll('[' + i + ']', latWords[i]);
    }
    return pinLower;
}

const zhfinals = ['a','e','i','o','u','ü','ā','ē','ī','ō','ū','ǖ','á','é','ó','í','ú','ǘ',
    'ǎ','ě','ǐ','ǒ','ǔ','ǚ','à','è','ì','ò','ù','ǜ'];

function checkfinals(s) {
    let chkf = false;
    for(var i=0;i<zhfinals.length;i++) {
        if(s == zhfinals[i]) chkf = true;
    }
    return chkf;
}