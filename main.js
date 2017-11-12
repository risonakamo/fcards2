window.onload=main;

var cards=[];
var _randomMode=0;
function main()
{
    var loadfile=window.location.hash.split("#");

    if (loadfile.length<2)
    {
        return;
    }

    getCards(loadfile);

    var resetbutton=document.querySelector(".reset");

    resetbutton.addEventListener("click",()=>{
        appendCards();
    });

    var rmodeBtn=document.querySelector(".random-mode");
    rmodeBtn.addEventListener("click",(e)=>{
        toggleRandomMode();
        rmodeBtn.innerHTML=`R-MODE: ${_randomMode}`;
    });
}

function getCards(loadfile)
{
    var cardget=new XMLHttpRequest();

    cardget.open("GET","cards/"+loadfile[1]+".json");

    cardget.responseType="json";

    cardget.onreadystatechange=()=>{
        if (cardget.readyState==4)
        {
            loadCards(cardget.response);
        }
    };

    cardget.send();
}

function loadCards(data)
{
    var newcard;

    for (var x=0;x<data.boxes.length;x++)
    {
        newcard=new fCard(data.boxes[x]);

        cards.push(newcard);
    }

    appendCards();

    var kControl=new _kController;
}

function appendCards()
{
    var cardsinsert=document.querySelector(".fcards");
    var insertIndex;
    var switchItem;

    cardsinsert.classList.add("hidden");
    setTimeout(()=>{
        cardsinsert.innerHTML="";

        for (var x=cards.length;x>=0;x--)
        {
            insertIndex=Math.floor(Math.random()*x);

            cards[insertIndex].hideReset();
            cards[insertIndex].randomSwitch();

            cardsinsert.appendChild(cards[insertIndex]);

            if (x!=0)
            {
                switchItem=cards[insertIndex];
                cards[insertIndex]=cards[x-1];
                cards[x-1]=switchItem;
            }
        }

        cardsinsert.classList.remove("hidden");
        window.scroll(0,0);
    },500);
}

function toggleRandomMode()
{
    _randomMode++;

    if (_randomMode>2)
    {
        _randomMode=0;
    }

    console.log(`randomiser mode: ${_randomMode}`);
    for (var x=0,l=cards.length;x<l;x++)
    {
        cards[x].changeRandommode(_randomMode);
    }
}