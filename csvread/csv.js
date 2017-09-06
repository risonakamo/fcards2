window.onload=main;

function main()
{

}

function parseInput()
{
    var data=document.querySelector(".input-area");

    data=data.value;

    data=data.split("\n");

    var y;
    for (var x=0,l=data.length;x<l;x++)
    {
        data[x]=data[x].match(/("(.+?)")|([^,]+)/g);

        for (y=0;y<2;y++)
        {
            if (data[x][y][0]==`"`)
            {
                data[x][y]=data[x][y].slice(1,-1);
            }
        }

    }

    return JSON.stringify({boxes:data});
}