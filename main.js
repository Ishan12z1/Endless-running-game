/**
 * @type {HTMLCanvasElement}
 */
import Player from "./Player.js"
import InputHandler from "./input.js"
import {BackGround} from  "./background.js"
import {FlyingEnemy,ClimbingEnemy,GroundEnemy} from "./enemy.js"
import {UI} from "./UI.js"

window.addEventListener('load',function()
{
    
/**
 * @type {HTMLCanvasElement}
 */
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width=900
    canvas.height=500
    class Game
    {
        constructor(width,height)
        {
            this.width=width,
            this.height=height,
            this.background=new BackGround(this)
            this.groundMargin=80,
            this.input = new InputHandler(this),
            this.UI=new UI(this),
            this.speed=0,
            this.maxSpeed=4,
            this.enemies=[],
            this.particles=[],
            this.enemyTimer=0,
            this.time=0,
            this.maxTime=30000,
            this.floatingMessages=[],
            this.lives=3,
            this.winningScore=50,
            this.gameOver=false,
            this.enemyInterval=1000,
            this.maxParticle=50,
            this.debug=false,
            this.score=0,
            this.fontColor='white',
            this.player=new Player(this),
            this.player.currentState=this.player.states[0],
            this.player.currentState.enter()
            this.collisionAnimation=[]
            }
    
    draw(context)
    {
        this.background.draw(context)
        this.player.draw(context)
        this.collisionAnimation.forEach(collision=>
            {
                collision.draw(context)
            })
        this.enemies.forEach(enemy=>
            enemy.draw(context))
            this.particles.forEach(particle=>{
                particle.draw(context)
            })
        this.floatingMessages.forEach(message=>
            {
                message.draw(context)
            })
      
        this.UI.draw(context)
    }
    update(deltatime)
    {   
        this.time+=deltatime
        if(this.lives<=0)
        {
            this.gameOver=true
        }
        if(this.time>=this.maxTime) this.gameOver=true
        this.player.update(this.input.keys,deltatime,this.enemies)
        this.background.update()
       // enemy code
        if(this.enemyTimer>=this.enemyInterval)
        {
            this.enemyTimer=0
            this.addEnemy()
        }
        else
            this.enemyTimer+=deltatime
        this.enemies.forEach(enemy=>{
            enemy.update(deltatime)
        })
       // collision sprite 
        this.collisionAnimation.forEach((collision,index)=>{
                collision.update(deltatime)
            }
            )
      
        //floating messages
        this.floatingMessages.forEach((message,index)=>
        {
            message.update()
        })
        //particle code
        this.particles.forEach((particle,index)=>{
            particle.update()
          
        })
        if(this.particles.length>this.maxParticle)
        {
            this.particles.length=this.maxParticle
        }
        this.floatingMessages = this.floatingMessages.filter(message=> !message.markedForDeletion)
        this.enemies = this.enemies.filter(enemy=> !enemy.markForDeletion)
        this.particles = this.particles.filter(particle=> !particle.markedForDeletion)
        this.collisionAnimation = this.collisionAnimation.filter(collisionAnimation=> !collisionAnimation.markedForDeletion)
     
    }
    addEnemy()
    {
        if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this))
        else if (this.speed>0) this.enemies.push(new ClimbingEnemy(this))

        this.enemies.push(new FlyingEnemy(this))
    }
    }
let game = new Game(canvas.width,canvas.height)
let lastTime=0
function animate(timeStamp)
{   
    let deltatime=timeStamp-lastTime
    lastTime=timeStamp
    ctx.clearRect(0,0,canvas.width,canvas.height)
    game.update(deltatime)
    game.draw(ctx)
    if(!game.gameOver)
        requestAnimationFrame(animate)

}
animate(0)

})