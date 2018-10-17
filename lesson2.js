class Shape {
    constructor(x,y){
        this.x = x;
        this.y = y;
        
    }
}

class Square extends Shape  {
    constructor(x){
        super(x,x);
    }
}

class Rectangle extends Shape {
    constructor(x,y){
        super(x,y);
    }
}