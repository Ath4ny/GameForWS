export default class Entity {
    constructor(x, y, width, height, solid, drawn, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.solid = solid;
        this.drawn = drawn;
        this.color = color;
    }



    bulletTypeCollision(object) {
        let XColl = false;
        let YColl = false;

        if ((object.x + object.width >= this.x) && (object.x <= this.x + this.width)) XColl = true;
        if ((object.y + object.height >= this.y) && (object.y <= this.y + this.height)) YColl = true;

        if (XColl & YColl) { return true; }
        return false;
    }

    rigidBodyCollision(object) {
        let XColl = false;
        let YColl = false;

        if ((object.x + object.width >= this.x) && (object.x <= this.x + this.width)) XColl = true;
        if ((object.y + object.height >= this.y) && (object.y <= this.y + this.height)) YColl = true;

        if (XColl & YColl) {
            object.y = this.y - object.height;
            return true;
        }
        return false;
    }

    //TEST***
    colis(object) {

        //top
        if ((object.y + object.height >= this.y
            && object.y <= this.y + (this.height / 2))

            && (object.x + object.width >= this.x
                && object.x <= this.x + this.width)) {

            object.y = this.y - object.height;
            return true;
        }
        // //right
        // if ((object.y <= this.y + this.height
        //     && object.y + object.height >= this.y)

        //     && (object.x + object.width >= this.x
        //         && object.x <= this.x + this.width)) {

        //     object.y = this.y + this.height;
        //     return true;
        // };
    

        return false;
    }
    //TEST***
}
   // //top
        // if ((object.y + object.height >= this.y
        //     && object.y <= this.y + (this.height / 2))

        //     && (object.x + object.width >= this.x
        //         && object.x <= this.x + this.width)) {

        //     object.y = this.y - object.height;
        //     return true;
        // }
        // //bottom
        // else if ((object.y <= this.y + this.height
        //     && object.y + object.height >= this.y)

        //     && (object.x + object.width >= this.x
        //         && object.x <= this.x + this.width)) {

        //     object.y = this.y + this.height;
        //     return true;
        // };