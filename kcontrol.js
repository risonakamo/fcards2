class _kController
{
    constructor()
    {
        this.icurrentBox=cards.length-1;
        this.currentBox=cards[this.icurrentBox];

        this.setupKeys();
    }

    setupKeys()
    {
        document.addEventListener("keydown",(e)=>{
            if (e.key=="ArrowRight")
            {
                this.select(this.icurrentBox-1);
            }

            if (e.key=="ArrowLeft")
            {
                this.select(this.icurrentBox+1);
            }

            if (e.key=="Enter")
            {
                this.currentBox.unhide();
                this.select(this.icurrentBox-1);
            }
        });
    }

    //give index of box to select. also deselects previous box
    //does nothing if invalid index
    select(box)
    {
        if (box<0 || box>=cards.length)
        {
            return;
        }

        this.currentBox.classList.remove("kselect");

        this.icurrentBox=box;
        this.currentBox=cards[this.icurrentBox];

        this.currentBox.classList.add("kselect");

        if (!this.inViewport())
        {
            this.currentBox.scrollIntoView();
            window.scrollBy(0,-50);
        }
    }

    //returns bool on if currentBox is in viewport
    inViewport()
    {
        var vtop=window.scrollY;
        var vbot=vtop+window.innerHeight;

        var etop=this.currentBox.offsetTop;
        var ebot=etop+this.currentBox.offsetHeight;

        if (vbot-ebot<0 || etop-vtop<0)
        {
            return 0;
        }

        return 1;
    }
}