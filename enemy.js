class Enemy
{
    constructor(game)
    {
      this.frameX=0,
      this.frameY=0,
      this.fps=20,
      this.frameInterval=1000/this.fps,
      this.frameTimer=0 ,
      this.markForDeletion=false
      this.color='orange'
    }
    update(deltatime)
    {
        this.x-=this.speedX + this.game.speed 
        this.y+=this.speedY 
        if(this.frameTimer>=this.frameInterval)
        {
            this.frameTimer=0
            if(this.frameX > this.maxFrame)
                this.frameX=0
            else 
                this.frameX++
        }
        else    this.frameTimer+=deltatime
            if(this.x<=0-this.width)
            this.markForDeletion=true
    }


    draw(context)
    {if(this.game.debug)
        { context.fillStyle=this.color
         context.fillRect(this.x,this.y,this.width,this.height)}

        context.drawImage(this.image,this.width*this.frameX,this.height*this.frameY,this.width,this.height,
                this.x,this.y,this.width,this.height)
    }
}
export class FlyingEnemy extends Enemy
{
    constructor(game)
    {
        super()
        this.game=game,
        this.height=44,
        this.value='+3',
        this.width=60,
        this.x=this.game.width+Math.random()*this.game.width*0.5 ,
        this.y=Math.random()*this.game.height*0.5,
        this.speedX=Math.random()+1,
        this.speedY=0,
        this.maxFrame=4,
        this.image=flyingEnemy,
        this.angle=0,
        this.va=Math.random()*0.1+0.1
    }
    update(deltatime)
    {
        super.update(deltatime)
        this.angle+=this.va
        this.y+=Math.sin(this.angle)
    }

}
export class GroundEnemy extends Enemy
{
    constructor(game)
    {
        super()
        this.game=game
        this.height=87,
        this.value='+1',
        this.width=60,
        this.x=this.game.width,
        this.y=this.game.height-this.height-this.game.groundMargin,
        this.image=groundEnemy,
        this.maxFrame=0,
        this.speedX=0,
        this.speedY=0
    }
update(deltatime)
{
    super.update(deltatime)
}

}
export class ClimbingEnemy extends Enemy
{
    constructor(game)
    {
        super()
        this.game=game,
        this.width=120,
        this.height=144,
        this.value='+2',
        this.x=Math.random()*(this.game.width-this.width),
        this.y=Math.random()*this.height*0.5,
        this.speedX=0,
        this.speedY=Math.random() > 0.5 ? 1 :-1 ,
        this.maxFrame=4,
        this.image=climbingEnemy

        
    }

    update(deltatime)
    {
        super.update(deltatime)
        if(this.y > this.game.height-this.height-this.game.groundMargin)
            this.speedY*=-1
        if(this.y < -this.height)
            this.markForDeletion=true
        
    }
    draw(context)
    {
        super.draw(context)
        context.beginPath()
        context.moveTo(this.x+this.width/2,0)
        context.lineTo(this.x+this.width/2,this.y+50)
        context.stroke()
    }
}