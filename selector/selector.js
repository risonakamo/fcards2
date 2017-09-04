window.onload=main;

function main()
{
    getCardList();
}

function getCardList()
{
    var r=new XMLHttpRequest();
    r.open("GET","fcards.json");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            // console.log(JSON.parse(r.response));
            parseCards(JSON.parse(r.response));
        }
    };

    r.send();
}

function parseCards(data)
{
    data=data.entries;
    var links=document.querySelector(".links");
    for (var x=0,l=data.length;x<l;x++)
    {
        links.insertAdjacentHTML("beforeend",genEntry(data[x][0],data[x][1],x%2));
    }
}

function genEntry(name,filename,white)
{
    if (white)
    {
        white="white";
    }

    else
    {
        white="";
    }

    return `<a class="link ${white}" href="..#${filename}">
    <div class="title">${name}</div>
    <div class="line-holder">
    <div class="line"></div>
    </div>
    <div class="filename">${filename}</div>
    </a>`;
}