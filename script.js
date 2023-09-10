const download = document.querySelector(".download");
const dark = document.querySelector(".Dark");
const light = document.querySelector(".Light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".shareBtn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQrText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://github.com/AaadityaG";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e){
    colorDark = e.target.value;
    generateQr();
}

function handleLightColor(e){
    colorLight = e.target.value;
    generateQr();
}

function handleQrText(e){
    const value = e.target.value;
    text = value;
    if(!value){
        text = defaultUrl;
    }
    generateQr();
}

async function generateQr(){
    // define here how to use this library - https://github.com/davidshimjs/qrcodejs
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark
    })
    download.href = await resolvedDataUrl();
}

async function handleShare(){
    setTimeout(async() => {
        try{
            const base64url = await resolvedDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            })
        }catch(error){
            alert("Your browser doesn't supporting sharing");
        }
    }, 100);
}


function handleSize(e){
    size = e.target.value;
    generateQr();
}

function resolvedDataUrl(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50)
    })
}

generateQr();