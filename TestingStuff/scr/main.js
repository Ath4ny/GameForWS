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
    isJumping: false,
    width: 80,
    height: 100,
    score: 0,
    color: 'red',
    prevX: 0,
    prevY: 500,
}


//foods
const food1 = new Entity(167, 250, 15, 15, true, true, 'yellow');
const food2 = new Entity(567, 250, 15, 15, true, true, 'yellow');
const food3 = new Entity(967, 250, 15, 15, true, true, 'yellow');
const food4 = new Entity(1367, 250, 15, 15, true, true, 'yellow');

const foods = [
    food1, food2, food3, food4
]

//platforms
const platform1 = new Entity(100, 300, 150, 20, true, 'black');
const platform2 = new Entity(500, 300, 150, 20, true, 'black');
const platform3 = new Entity(900, 300, 150, 20, true, 'black');
const platform4 = new Entity(1300, 300, 150, 20, true, 'black');

const platforms = [
    platform1, platform2, platform3, platform4
]

//floor
const floor = new Entity(0, 600, canvas.width, 100, true, true, 'black');



const update = () => {

    if (controller.up && player.isJumping == false) {
        player.y_velocity -= 90;
        player.isJumping = true;
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

    //keyCode indentify
    // document.addEventListener('keydown', (key)=>{
    //     console.log(key)
    // })

    player.prevX = player.x;
    player.prevY = player.y;
    //floor
    if (floor.rigidBodyCollision(player) && floor.solid == true) {
        player.isJumping = false;
    }

    //platforms
    platforms.forEach(platform => {
        if (platform.rigidBodyCollision(player) && platform.solid == true) {
            player.isJumping = false;
            console.log('collision detected')
        }
    })

    //food
    foods.forEach(food => {
        if (food.bulletTypeCollision(player) && food.drawn == true) {
            food.drawn = false;
            player.score++;
        }
    })


    //DRAWING    *******************************************************************************

    //background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //solid ground 
    context.fillStyle = floor.color;
    context.fillRect(floor.x, floor.y, floor.width, floor.height);


    //platforms
    platforms.forEach(platform => {
        context.fillStyle = platform.color;
        context.fillRect(platform.x, platform.y, platform.width, platform.height);
        // context.strokeStyle = 'purple';
        // context.strokeRect(platform.x + platform.width / 2, 0, 1, canvas.height)  //test stuff
    })


    //food
    foods.forEach(food => {
        if (food.drawn) {
            context.fillStyle = food.color;
            context.fillRect(food.x, food.y, food.width, food.height);
            context.strokeRect(food.x, food.y, food.width, food.height);
        }
    })


    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    window.requestAnimationFrame(update);

    context.font = "25px Arial";
    context.fillStyle = "rgb(0,0,0)";
    context.fillText("Score: " + player.score, 10, 50);
}
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(update);