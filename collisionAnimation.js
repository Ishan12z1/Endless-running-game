export class CollisionAnimation
{
    constructor(game,x,y)
    {
        this.game=game,
        this.image=document.getElementById('collisionAnimation'),
        this.spriteWidth=100,
        this.spriteHeight=100,
        this.size=Math.random()+0.5,
        this.width=this.spriteWidth*this.size,
        this.height=this.spriteHeight*this.size,
        this.x=x-this.width*0.5,
        this.y=y-this.height*0.5,
        this.frameMax=4,
        this.frame=0,
        this.markedForDeletion=false,
        this.fps=15,
        this.frameInterval=0,
        this.frameTimer=1000/this.fps


    }

    update(deltatime)
    {
        this.x-=this.game.speed
        if(this.frameInterval>this.frameTimer)
        {   
            this.frameInterval=0
            if(this.frame >= this.frameMax)
                this.markedForDeletion=true
            else 
                this.frame++
        }
        else    this.frameInterval+=deltatime
    }
    draw(context)
{
    context.drawImage(this.image,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}