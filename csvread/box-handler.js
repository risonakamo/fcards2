class _boxhandler
{
    constructor()
    {
        this.outputArea=document.querySelector(".output-box");
        this.outputCover=this.outputArea.querySelector(".cover");
        this.outputText=this.outputArea.querySelector(".output-area");

        this.inputArea=document.querySelector(".input-area");

        this.outputCover.addEventListener("click",(e)=>{
            this.parse();
        });

        this.inputArea.addEventListener("keydown",(e)=>{
            if (e.key=="Enter" && e.ctrlKey)
            {
                e.preventDefault();
                this.parse();
            }
        });
    }

    parse()
    {
        this.outputText.value=this.parseInput();
        this.outputArea.classList.remove("small");
    }

    parseInput()
    {
        var data=this.inputArea.value;

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

            if (data[x].length>2)
            {
                var furigana=data[x].slice(2);
                data[x]=data[x].slice(0,2);
                data[x].push(furigana);
            }
        }

        return JSON.stringify({boxes:data});
    }
}