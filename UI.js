export class UI
{
    constructor(game)
    {   this.game=game,
        this.fontSize=30,
        this.fontFamily='Creepster',
        this.image=lives


    }
    draw(context)
    {
        context.font=this.fontSize + 'px ' + this.fontFamily
        context.textAlign='left'
        context.fillStyle=this.game.fontColor
        context.fillText("Score : "+ this.game.score,20,50)
        context.font=this.fontSize*0.8+'px '+this.fontFamily
        context.fillText('Time: '+(this.game.time*0.001).toFixed(1),20,80)
        for (let i=0;i<this.game.lives;i++)
            context.drawImage(this.image,20+(i*25),95,25,25)
        if(this.game.gameOver)
        {
            context.textAlign='center'
            if(this.game.score > this.game.winningScore)
           { context.fillStyle='white'
           context.globalAlpha=0.1
            context.fillRect(0,this.game.height*0.4,this.game.width,100)
            context.globalAlpha=1
            context.fillStyle='black'
            context.font=this.fontSize*2+'px '+this.fontFamily
            context.fillText('Boo-yah',this.game.width*0.5,this.game.height*0.5)
            context.font=this.fontSize*0.7+'px '+this.fontFamily
            context.fillText('What are the creatures of night afraid of? You!!! ',this.game.width*0.5,this.game.height*0.5+30 )
        }
        else 
            {
                context.fillStyle='white'
                context.globalAlpha=0.1

            context.fillRect(0,this.game.height*0.4,this.game.width,100)
            context.globalAlpha=1

            context.fillStyle='black'
            context.font=this.fontSize*2+'px '+this.fontFamily
            context.fillText('Love at first bite?',this.game.width*0.5,this.game.height*0.5)
            context.font=this.fontSize*0.7+'px '+this.fontFamily
            context.fillText('Nope.Better luck next time',this.game.width*0.5,this.game.height*0.5+30 )
            }
        }

    }

}