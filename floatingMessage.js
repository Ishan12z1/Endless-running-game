export class FloatingMessage
{
    constructor(value,x,y,targetX,targetY)
    {
        this.value=value,
        this.x=x,
        this.y=y,
        this.targetX=50,
        this.targetY=50,
        this.markedForDeletion=false,
        this.timer=0
    }
    update()
    {
        this.x+=(-this.x+this.targetX)*0.03
        this.y+=(-this.y+this.targetY)*0.03
        this.timer++
        if(this.timer > 90)
            this.markedForDeletion=true
    }
    draw(context)
    {
        context.font='20px Creepster'
        context.fillStyle='black'
        context.fillText(this.value,this.x,this.y)
        context.fillStyle='white'
        context.fillText(this.value,this.x+2,this.y+2)
    }
}