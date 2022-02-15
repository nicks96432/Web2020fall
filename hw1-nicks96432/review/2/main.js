let giant = new Roadbike("Giant Propel Advanced Pro 1", 88000, "https://www.giantcyclingworld.com/backend/?p_action_name=get-file&id=20319860");
let bianchi = new Roadbike("Bianchi Oltre XR4 DISC", 158000, "https://miro.medium.com/max/2000/1*n_CxqX0MarU9y4t_YQkenQ.jpeg");
let pinarello = new Roadbike("Pinarello Dogma F12 DISC", 196000, "http://www.jeslerbike.com/PageImg/images/DISK-15-TEAM-INEOS.jpg");
let merida = new Roadbike("Merida Scultura Team E", 328000, "https://img.mweb.com.tw/thumb/177/1500x1500/2019%25E5%2585%25A8%25E8%25BB%258A%25E7%25B3%25BB/SCULTURA/scultura_team_moc2019_1.jpg");
let specialized = new Roadbike("Specialized S-Works Venge", 340000, "https://cdn.shopify.com/s/files/1/0272/8935/4337/products/97820-01_VENGE-SW-DISC-DI2-CARB-TARBLK_HERO_2000x.jpg?v=1586424701");
let cannondale = new Roadbike("Cannondale SuperSix Evo DISC", 90800, "https://www.cannondale-parts.de/WebRoot/Store20/Shops/61764971/5D39/6B43/2844/47A6/2175/0A0C/6D0F/EAD3/C20_C11370M_SuperSix_CrbDisc_ULT_REP_PD.png");
let cervelo = new Roadbike("Cerve&#769lo PX-Series", 398000, "https://www.cervelo.com/media/catalog/product/cache/ef935f058ac986049d339021d5b68b26/p/x/px_da_di2_lt_teal_navy_profile_7_copy_1.15.30_pm.jpg");
let colnago = new Roadbike("Colnago V3Rs DISC", 172000, "https://www.bikesportadventure.com/77246-large_default/Array.jpg");

let roadbikes = [
    giant, bianchi, pinarello, merida, specialized, cannondale, cervelo, colnago
];

let display = document.getElementById("display");
let display_source = document.getElementById("source");
let infoArr = document.getElementsByClassName("image-viewer__info");
let nbutton = document.getElementById("next");
let pbutton = document.getElementById("previous");

let idx = 0;
if (roadbikes.length === 1) {
    nbutton.classList.add("disabled");
    pbutton.classList.add("disabled");
}

function Roadbike(name, price, link) {  // object constructor
    this.name = name;
    this.price = price;
    this.link = link;
}

function nextImage() {
    if (idx < roadbikes.length - 1) {
        showNextImage();
        showSource();
        showInfo();
        if(pbutton.classList.contains("disabled"))
            pbutton.classList.remove("disabled");
    }
    if (idx === roadbikes.length - 1)
        nbutton.classList.add("disabled");
    console.log(idx);
    console.log("Next : " + nbutton.className);
    console.log("Previous : " + pbutton.className);
}

function previousImage() {
    if(idx > 0) {
        showPreviousImage();
        showSource();
        showInfo();
        if (nbutton.classList.contains("disabled"))
            nbutton.classList.remove("disabled");
        }
    if (idx === 0)
        pbutton.classList.add("disabled");  
    console.log(idx);
    console.log("Next : " + nbutton.className);
    console.log("Previous : " + pbutton.className);
}

function showNextImage() {
    let image = new Image();
    display.src = "images/loading.gif";
    image.onload = function () {
        display.src = roadbikes[idx].link;
    }
    image.src = roadbikes[++idx].link;
}

function showPreviousImage() {
    let image = new Image();
    display.src = "images/loading.gif";
    image.onload = function () {
        display.src = roadbikes[idx].link;
    }
    image.src = roadbikes[--idx].link;
}

function showSource() {
    display_source.href = roadbikes[idx].link;
    display_source.innerHTML = "Source : " + roadbikes[idx].link;
}

function showInfo() {
    infoArr[0].innerHTML = roadbikes[idx].name;
    // infoArr[1].innerHTML = "$NTD : " + roadbikes[idx].price;
    infoArr[1].innerHTML = `$NTD : ${roadbikes[idx].price}`;
}
