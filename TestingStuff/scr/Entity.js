export default class Entity {
    constructor(x, y, width, height, solid, drawn) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.solid = solid;
        this.drawn = drawn;
    }

    bulletTypeCollision(object) {
        let XColl = false;
        let YColl = false;

        if ((object.x + object.width >= this.x) && (object.x <= this.x + this.width)) XColl = true;
        if ((object.y + object.height >= this.y) && (object.y <= this.y + this.height)) YColl = true;

        if (XColl & YColl) { return true; }
        return false;
    }

    rigidTypeCollision(object) {
        let XColl = false;
        let YColl = false;

        if ((object.x + object.width >= this.x) && (object.x <= this.x + this.width)) XColl = true;
        if ((object.y + object.height >= this.y) && (object.y <= this.y + this.height)) YColl = true;

        if (XColl & YColl){
            object.y = this.y - object.height;
            return true;
        }
        return false;
    }

}