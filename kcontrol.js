class _kController
{
    /*int icurrentBox: index of current box
      int usedKeys: bool if user has used keycontrol yet (0=nope)
      element currentBox: element of current box*/
    constructor()
    {
        this.icurrentBox=-1;
        this.usedKeys=0;

        this.setupKeys();
    }

    setupKeys()
    {
        document.addEventListener("keydown",(e)=>{
            if (!this.usedKeys)
            {
                document.querySelector(".buttons-menu").classList.add("keyboard-mode");
                this.usedKeys=1;
            }

            if (e.key=="ArrowRight")
            {
                this.navigate(-1);
            }

            if (e.key=="ArrowLeft")
            {
                this.navigate(1);
            }

            if (e.key=="ArrowUp")
            {
                e.preventDefault();
                this.navigate(1,1);
            }

            if (e.key=="ArrowDown")
            {
                e.preventDefault();
                this.navigate(-1,1);
            }

            if (e.key=="Enter" || e.key=="Space")
            {
                if (this.currentBox)
                {
                    this.currentBox.unhide();
                }

                this.navigate(-1);
            }

            if (e.key=="r")
            {
                appendCards();
            }

            if (e.key=="m")
            {
                toggleRandomMode();
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

        if (this.currentBox)
        {
            this.currentBox.classList.remove("kselect");
        }

        this.icurrentBox=box;
        this.currentBox=cards[this.icurrentBox];

        this.currentBox.classList.add("kselect");

        if (this.inViewport()<=0)
        {
            this.currentBox.scrollIntoView();
            window.scrollBy(0,-50);
        }
    }

    //returns int on if currentBox is in viewport
    //-1: completely out of viewport
    //0: partially not in viewport
    //1: in viewport
    inViewport()
    {
        var vtop=window.scrollY;
        var vbot=vtop+window.innerHeight;

        var etop=this.currentBox.offsetTop;
        var ebot=etop+this.currentBox.offsetHeight;

        if (ebot<vtop || etop>vbot)
        {
            return -1;
        }

        if (vbot<ebot || etop<vtop)
        {
            return 0;
        }

        return 1;
    }

    //immediately select the topmost leftmost visible box
    jumpVisible()
    {
        var visibleTop=window.scrollY;

        for (var x=0,l=cards.length;x<l;x++)
        {
            if (cards[x].offsetTop<visibleTop)
            {
                this.select(x-1);
                return;
            }
        }

        this.select(cards.length-1);
    }

    //perform navigation in given direction
    //if a selected card is not onscreen jump to
    //topmost visible using jumpVisible
    //give vertical as true to navigate vertically
    navigate(direction,vertical=0)
    {
        if (this.icurrentBox==-1 || this.inViewport()==-1)
        {
            this.jumpVisible();
        }

        else if (vertical)
        {
            var boxx=Math.floor(_cardsinsert.offsetWidth/290);

            if (boxx==0)
            {
                boxx=1;
            }

            boxx*=direction;

            this.select(this.icurrentBox+boxx);
        }

        else
        {
            this.select(this.icurrentBox+direction);
        }
    }

    //unselect anything selected
    resetSelect()
    {
        if (this.currentBox)
        {
            this.currentBox.classList.remove("kselect");
        }

        this.icurrentBox=-1;
        delete this.currentBox;
    }
}