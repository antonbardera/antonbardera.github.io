let globalData;
let minValue = 0;
let maxValue = 10;
let elemperpage = 10;
let numberpages;
let currentpage;

async function fetchListJSON() {
    const response = await fetch('https://raw.githubusercontent.com/antonbardera/Multimedia/main/data/videoList.json');
    const data = await response.json();
    return data;
  }
  

function initApp(){
    fetchListJSON().then(data => {
        globalData = data;
        numberpages = Math.ceil(globalData.length / elemperpage);
        setPage(1);
    });
}

function setPage(n){
    let minValue = (n-1)*elemperpage;
    let maxValue = n*elemperpage;
    let shownData = globalData.slice(minValue, maxValue);
    var listNode = document.getElementById("list");	
    var titlename = "<ul>";
    shownData.forEach(element => {
        titlename += `<li><p><strong>Clip Number</strong>: ${element.clipNumber} </br>
        <strong>Author</strong>: ${element.author} </p>
        <iframe width="560" height="315" src="${element.linkYT}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe></li>`
    });
    titlename += "</ul>";
    listNode.innerHTML = titlename; 
    let paginationCode = getPagination(n);
    var upperPag = document.getElementById("upperPag");	
    upperPag.innerHTML = paginationCode;
    var lowerPag = document.getElementById("lowerPag");	
    lowerPag.innerHTML = paginationCode;

}

function getPagination(n){
    var code = "";
    for(let i = 1; i <= numberpages; i++){
        code += "<a ";
        if(i==n){ 
            code+=`class="active">${i}</a>`
        }else{
            code += `onclick=setPage(${i})>${i}</a>`;
        }
    }
    return code;
}
/*<a href="#">&laquo;</a>
<a href="#">1</a>
<a class="active" href="#">2</a>
<a href="#">3</a>
<a href="#">4</a>
<a href="#">5</a>
<a href="#">6</a>
<a href="#">&raquo;</a>
*/