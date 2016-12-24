var Snowflake = function(){

    this.pos = createVector(random(width),random(height))
    this.vel = createVector(0,0)
    this.size = random(4) + 1
    this.maxSpeed = random(2) + 2
    this.noiseOffset = random(100000000)
    
    this.update = function(){
        var floatAngle = noise((frameCount+this.noiseOffset)/100)*TWO_PI
        floatAngle = (HALF_PI+floatAngle)%TWO_PI
        var float = p5.Vector.fromAngle(floatAngle)
        
        acc = createVector(0,0)
        acc.add(float)
        acc.add(g)

        this.vel.add(acc)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)

        if(this.pos.y > height){
            this.pos = createVector(random(width),-10)
        }
    }

    this.render = function(){
        stroke(255)
        strokeWeight(this.size)
        point(this.pos.x, this.pos.y)
    }
}