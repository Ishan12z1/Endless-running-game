import { Sitting ,Running,Jumping,Falling, Rolling ,Diving,Hit} from "./states.js"
import { CollisionAnimation } from "./collisionAnimation.js"
import { FloatingMessage } from "./floatingMessage.js"
export default class Player
{
    constructor(game)
    {
        this.game=game,
        this.width=100,
        this.height=91.3,
        this.x=this.game.width/4,
        this.y=this.game.height-this.height-this.game.groundMargin,
        this.image=player,
        this.frameX=0,
        this.frameY=0,
        this.maxFrame=3,
        this.timeInterval=0,
        this.fps=20 ,
        this.frameInterval=1000/this.fps,
        this.maxSpeed=10,
        this.speed=0,
        this.vy=0,
        this.weight=1,
        this.states=[new Sitting(this.game),new Running(this.game),
            new Jumping(this.game),new Falling(this.game),
            new Rolling(this.game),new Diving(this.game),
        new Hit(this.game)]


    }
    update(input,deltatime,enemies)
    {
        this.currentState.handelInput(input)

        //horizontal Movement
        this.x+=this.speed
        if(input.includes('ArrowRight')&&this.currentState!==this.states[6]) this.speed=this.maxSpeed
        else if (input.includes('ArrowLeft')&&this.currentState!==this.states[6]) this.speed=-this.maxSpeed
        else this.speed=0
        if(this.x<0)this.x=0
        else if (this.x>this.game.height-this.width)this.x=this.game.height-this.width

        // vertical Movement
       this.y+=this.vy
       if(!this.onGround())this.vy+=this.weight
       else this.vy=0
       if(this.y > this.game.height-this.height)
       this.y=this.game.height-this.height-this.game.groundMargin
        // vertical boundary
       if(this.y>this.game.height-this.height-this.game.groundMargin)
            this.y=this.game.height-this.height-this.game. groundMargin

        // sprite Animation
        if(this.timeInterval>=this.frameInterval)
        {   this.timeInterval=0
            if(this.frameX>this.maxFrame)
            this.frameX=0
            else 
                this.frameX++  
        }
        else
            this.timeInterval+=deltatime
        //collisoin 
        this.checkCollisoins(enemies)      
       
    }
    setState(state,gameSpeed)
    {
        this.currentState=this.states[state]
        this.game.speed=gameSpeed*this.game.maxSpeed
        this.currentState.enter()
    }

    draw(context)
    {
        if(this.game.debug)
           { context.fillStyle='white'
            context.fillRect(this.x,this.y,this.width,this.height)}
        context.drawImage(this.image,this.width*this.frameX,this.height*this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
    }
  
    onGround()
    {
        return (this.y >= this.game.height-this.height-this.game.groundMargin )
    }
    checkCollisoins(enemies)
    {
        enemies.forEach(enemy=>
            {
                if((enemy.x+enemy.width>this.x && enemy.x<this.x+this.width)
                && enemy.y+enemy.height > this.y && enemy.y < this.y+this.height)
                {
                    enemy.markForDeletion=true
                    this.game.collisionAnimation.push(new CollisionAnimation(this.game,enemy.x+enemy.width*0.5,
                        enemy.y+enemy.height*0.5))
                    if(this.currentState.state=='Rolling'|| this.currentState.state=='DIVING')
                        {
                        this.game.floatingMessages.push(new FloatingMessage(enemy.value,enemy.x,enemy.y,20,80))
                        this.game.score+=parseInt(enemy.value)}
                    else   
                    { 
                        if(this.game.score>5)
                            this.game.score-=5
                        else
                            this.game.score=0
                        this.setState(6,0)
                        this.game.lives-=1
                    }
                                }
            })
    }
}