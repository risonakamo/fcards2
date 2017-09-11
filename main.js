window.onload=main;

var cards=[];
function main()
{
    var loadfile=window.location.hash.split("#");

    if (loadfile.length<2)
    {
        return;
    }

    var cardget=new XMLHttpRequest();
    cardget.open("get","cards/"+loadfile[1]+".json");
    cardget.responseType="json";
    cardget.onreadystatechange=()=>{
        if (cardget.readyState==4)
        {
            loadCards(cardget.response);
        }
    };
    cardget.send();

    var resetbutton=document.querySelector(".reset");

    resetbutton.addEventListener("click",()=>{
        appendCards();
    });
}

function loadCards(data)
{
    var newcard;

    for (var x=0;x<data.boxes.length;x++)
    {
        newcard=new fCard(data.boxes[x][0],data.boxes[x][1]);

        cards.push(newcard);
    }

    appendCards();
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