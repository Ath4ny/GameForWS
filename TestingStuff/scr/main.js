import controller from './controller.js';
import Entity from './Entity.js'

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//window_size
context.canvas.width = 1500;
context.canvas.height = 700;
context.canvas.scroll = 0;

//player
const player = {
    x: 0,
    y: 500,
    x_velocity: 0,
    y_velocity: 0,
    jumping: false,
    width: 80,
    height: 100,
    score: 0,
}

//foods
const food1 = new Entity(175, 250, 15, 15, true, true);
const food2 = new Entity(575, 250, 15, 15, true, true);
const food3 = new Entity(975, 250, 15, 15, true, true);
const food4 = new Entity(1375, 250, 15, 15, true, true);

const foods = [
    food1, food2, food3, food4
]

//platforms
const platform1 = new Entity(100, 300, 150, 20, true);
const platform2 = new Entity(500, 300, 150, 20, true);
const platform3 = new Entity(900, 300, 150, 20, true);
const platform4 = new Entity(1300, 300, 150, 20, true);

const platforms = [
    platform1, platform2, platform3, platform4
]

//floor
const floor = new Entity(0, 600, canvas.width, 100, true);


const update = () => {

    if (controller.up && player.jumping == false) {
        player.y_velocity -= 90;
        player.jumping = true;
    }
    if (controller.left) {
        player.x_velocity -= 1;
    }
    if (controller.right) {
        player.x_velocity += 1;
    }

    player.y_velocity += 2;
    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.y_velocity *= 0.9;
    player.x_velocity *= 0.9;




    //floor
    if (floor.rigidTypeCollision(player) && floor.solid == true) {
        player.jumping = false;
    }

    //platforms
    platforms.forEach(platform => {
        if (platform.rigidTypeCollision(player) && platform.solid == true) {
            player.jumping = false;
        }
    })

    //food
    foods.forEach(food => {
        if (food.bulletTypeCollision(player) && food.drawn == true) {
            food.drawn = false;
            player.score++;
        }
    })




    //background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //solid ground 
    context.fillStyle = "black";
    context.fillRect(floor.x, floor.y, floor.width, floor.height);


    //platforms
    platforms.forEach(platform => {
        context.fillStyle = "black";
        context.fillRect(platform.x, platform.y, platform.width, platform.height);
    })


    //food
    foods.forEach(food => {
        if (food.drawn) {
            context.fillStyle = "yellow";
            context.fillRect(food.x, food.y, food.width, food.height);
            context.strokeRect(food.x, food.y, food.width, food.height);
        }
    })


    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.width, player.height);
    window.requestAnimationFrame(update);


    context.font = "25px Arial";
    context.fillStyle = "rgb(0,0,0)";
    context.fillText("Score: " + player.score, 10, 50);
}
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(update);
