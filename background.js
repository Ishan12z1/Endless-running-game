class Layer
{
    constructor(game,width,height,speedModifier,image)
    {
        this.game=game,
        this.width=width,
        this.height=height,
        this.speedModifier=speedModifier,
        this.image=image,
        this.x=0,
        this.y=0
    }
    update()
    {
        if(this.x<=-this.width+(this.game.speed*this.speedModifier))
            this.x=0
        else this.x-=(this.game.speed*this.speedModifier)


    }
    draw(context)   
    {
        context.drawImage(this.image,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.width+this.x,this.y,this.width,this.height)

    }
}
export class BackGround 
{
constructor(game)
{
    this.game=game,
    this.width=1667,
    this.height=500,
    this.backGroundLayers=[
        new Layer(this.game,this.width,this.height,0,layer1),
        new Layer(this.game,this.width,this.height,0.2,layer2),
        new Layer(this.game,this.width,this.height,0.4,layer3),
        new Layer(this.game,this.width,this.height,0.8,layer4),
        new Layer(this.game,this.width,this.height,1,layer5),]

}
update()
{
    this.backGroundLayers.forEach(layer=>
        {
            layer.update()
        })
}
draw(context)
{
    this.backGroundLayers.forEach(layer=>
        {
            layer.draw(context)
        })
}

}