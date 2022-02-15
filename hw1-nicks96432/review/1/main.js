let Control_center = {
    URL_list: [
        "https://s.yimg.com/ny/api/res/1.2/_d0_0h6uV1CndJSKOsRt2A--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/zh-Hant-TW/homerun/upmedia.mg.tw/cde8b5eab6ae2458cf6190e6360f14c6",
        "https://obs.line-scdn.net/0hcvzLNdWFPFlHNRSiIg1DDn1jPzZ0WS9aIwNtRhhbYm0-DSkIclQkN2Q0MWhjBHsHKQdxO2c1J2g5UHIGLFck/w644",
        "https://p2.bahamut.com.tw/B/2KU/23/f0b53dab390302b1865bcfc957181nz5.JPG?v=1584503895423",
        "https://img.technews.tw/wp-content/uploads/2019/05/23114852/League-of-Legends.jpg"
    ],
    current_index:0,
    max_length: 3,
    min_length:0
}

function get_initialize()
{
    if(Control_center.URL_list.length > 0)
    {
        let picture = document.getElementById("display");
        picture.src = Control_center.URL_list[0];
        let picture_src = document.getElementsByTagName("a")[0];
        picture_src.href = Control_center.URL_list[0];
        picture_src.innerHTML = Control_center.URL_list[0];
        let loading = document.getElementById("transient");
        loading.style.visibility = "hidden";  

    }
    if(Control_center.current_index == Control_center.min_length)
    {
        let l_button = document.getElementById("left_button");
        l_button.style.visibility = "hidden";
    }
    if(Control_center.current_index == Control_center.max_length)
    {
        let r_button = document.getElementById("right_button");
        r_button.style.visibility = "hidden";
    }
    return;
}

function loading_picture(dir)
{
    let picture = document.getElementById("display");
    picture.style.opacity = 0.2;
    let loading = document.getElementById("transient");
    loading.style.visibility = "visible";
    let l_button = document.getElementById("left_button");
    l_button.style.visibility = "hidden";
    let r_button = document.getElementById("right_button");
    r_button.style.visibility = "hidden";
    if(dir == "right")
    {
        setTimeout(forward_proceed, 1000);
        setTimeout(function(){
            picture.style.opacity = 1;
            loading.style.visibility = "hidden";
        }, 1000);
    }
    else if(dir == "left")
    {
        setTimeout(rear_proceed, 1000);
        setTimeout(function(){
            picture.style.opacity = 1;
            loading.style.visibility = "hidden";
        }, 1000);
    }


}
function forward_proceed()
{
    Control_center.current_index += 1;
    let picture = document.getElementById("display");
    picture.src = Control_center.URL_list[Control_center.current_index];
    let picture_src = document.getElementsByTagName("a")[0];
    picture_src.href = Control_center.URL_list[Control_center.current_index];
    picture_src.innerHTML = Control_center.URL_list[Control_center.current_index]; 
    let l_button = document.getElementById("left_button");
    l_button.style.visibility = "visible";
    let r_button = document.getElementById("right_button");
    r_button.style.visibility = "visible"; 
    if(Control_center.current_index == Control_center.max_length)
    {
        let r_button = document.getElementById("right_button");
        r_button.style.visibility = "hidden";
    }
    if(Control_center.current_index == Control_center.min_length + 1)
    {
        let l_button = document.getElementById("left_button");
        l_button.style.visibility = "visible";
    }
}

function rear_proceed()
{
    Control_center.current_index -= 1;
    let picture = document.getElementById("display");
    picture.src = Control_center.URL_list[Control_center.current_index];
    let picture_src = document.getElementsByTagName("a")[0];
    picture_src.href = Control_center.URL_list[Control_center.current_index];
    picture_src.innerHTML = Control_center.URL_list[Control_center.current_index];
    let l_button = document.getElementById("left_button");
    l_button.style.visibility = "visible";
    let r_button = document.getElementById("right_button");
    r_button.style.visibility = "visible"; 
    if(Control_center.current_index == Control_center.min_length)
    {
        let l_button = document.getElementById("left_button");
        l_button.style.visibility = "hidden";
    }
    if(Control_center.current_index == Control_center.max_length - 1)
    {
        let r_button = document.getElementById("right_button");
        r_button.style.visibility = "visible";
    }
}

get_initialize();

