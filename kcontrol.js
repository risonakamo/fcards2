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
    }
}