const board = document.querySelector(".board");

const userStart = [100, 10];
let currentUser = userStart;

let bulletsArray = [];

let goR = true;
let goL = false;

let moveBulletInterval;
let moveEnemyInterval;

let score = 0;



class invaders{
    constructor(x, y){
        this.coord = [x,y];
    }
}

const invadersArray = [
    new invaders (20, 420),
    new invaders (50, 420),
    new invaders (80, 420),
    new invaders (110, 420),
    new invaders (140, 420),
    new invaders (170, 420),
    new invaders (200, 420),
    new invaders (230, 420),
    new invaders (20, 390),
    new invaders (50, 390),
    new invaders (80, 390),
    new invaders (110, 390),
    new invaders (140, 390),
    new invaders (170, 390),
    new invaders (200, 390),
    new invaders (230, 390),
    new invaders (20, 360),
    new invaders (50, 360),
    new invaders (80, 360),
    new invaders (110, 360),
    new invaders (140, 360),
    new invaders (170, 360),
    new invaders (200, 360),
    new invaders (230, 360),
    new invaders (20, 330),
    new invaders (50, 330),
    new invaders (80, 330),
    new invaders (110, 330),
    new invaders (140, 330),
    new invaders (170, 330),
    new invaders (200, 330),
    new invaders (230, 330),
    new invaders (20, 300),
    new invaders (50, 300),
    new invaders (80, 300),
    new invaders (110, 300),
    new invaders (140, 300),
    new invaders (170, 300),
    new invaders (200, 300),
    new invaders (230, 300),
];

function createEnemys(){
    for (i = 0; i < invadersArray.length; i++){
        const enemy = document.createElement("div");
        enemy.setAttribute("class", "enemy");
        enemy.setAttribute("id", `${i}`);
        board.append(enemy);
        enemy.style.left = `${invadersArray[i].coord[0]}px`;
        enemy.style.bottom = `${invadersArray[i].coord[1]}px`;

    }
}

function moveEnemys(){
    const enemys = document.querySelectorAll(".enemy");
    const boardPosition = board.getBoundingClientRect();

    for (i = 0; i < invadersArray.length; i++){

        enemyPosition = enemys[i].getBoundingClientRect();

        if (enemyPosition.x > boardPosition.x + boardPosition.width - 30){

            goR = false;
            goL = true;

            for (i = 0; i < invadersArray.length; i++){
                enemys[i].style.bottom = `${invadersArray[i].coord[1] -= 20}px`;
            }


        } else if (enemyPosition.x + enemyPosition.width < boardPosition.x + 30){
            for (i = 0; i < invadersArray.length; i++){
                enemys[i].style.bottom = `${invadersArray[i].coord[1] -= 20}px`;

            }
            goR = true;
            goL = false;

        }
    }

    for (i = 0; i < invadersArray.length; i++){
        if (goR == true && goL == false){
            enemys[i].style.left = `${invadersArray[i].coord[0] += 10}px`;
        }
        
        if (goR == false && goL == true){
            enemys[i].style.left = `${invadersArray[i].coord[0] -= 10}px`;
        }
    }

    checkCollision();

}

function createUser(){
    const user = document.createElement("div");
    user.setAttribute("class", "user");
    board.append(user);
    user.style.left = `${currentUser[0]}px`;
    user.style.bottom = `${currentUser[1]}px`;
}

function moveUser(e){
    const user = document.querySelector(".user");
    const userPosition  = user.getBoundingClientRect();

    switch(e.key){
        case "ArrowLeft":
            if (currentUser[0] > 0){
                user.style.left = `${currentUser[0] -= 10}px`;
            }

            break;
        case "ArrowRight":
            if (currentUser[0] < (300 - userPosition.width)){
                user.style.left = `${currentUser[0] += 10}px`;
            }
            break;
    }
}

function createBullets(){
    const bullet = document.createElement("div");
    bullet.setAttribute("class", "bullet");
    board.append(bullet);
    bullet.style.left = `${currentUser[0]}px`;
    bullet.style.bottom = `10px`;
    bulletsArray.push(10);
}

function moveBullet(){
    const bullet = document.querySelector(".bullet");
    const boardPosition = board.getBoundingClientRect();

    if (bulletsArray < 1){
        document.addEventListener("click", createBullets);
    } else {
        const bulletPosition = bullet.getBoundingClientRect();
        bullet.style.bottom = `${bulletsArray[0] += 10}px`;
        document.removeEventListener("click", createBullets);

        if (bulletPosition.x > boardPosition.x + boardPosition.width ||
            bulletPosition.x + bulletPosition.width < boardPosition.x ||
            bulletPosition.y > boardPosition.y + boardPosition.height ||
            bulletPosition.y + bulletPosition.height < boardPosition.y
            ){
                bullet.classList.remove("bullet");
                bullet.remove();
                bulletsArray = [];
        }

    }



    checkCollision();

}


function checkCollision(){
    const bullets = document.querySelectorAll(".bullet");   
    const enemys = document.querySelectorAll(".enemy");
    const user = document.querySelector(".user");
    const userPosition = user.getBoundingClientRect();


    bullets.forEach(function(bullet){
        bulletPosition = bullet.getBoundingClientRect();

        for (i = 0; i < enemys.length; i++){
            const enemyPosition = enemys[i].getBoundingClientRect();

            if (bulletPosition.x > enemyPosition.x + enemyPosition.width ||
                bulletPosition.x + bulletPosition.width < enemyPosition.x ||
                bulletPosition.y > enemyPosition.y + enemyPosition.height ||
                bulletPosition.y + bulletPosition.height < enemyPosition.y
                ){
                    console.log("No collision with Cars")
            } else {
                    bullet.classList.remove("bullet");
                    enemys[i].classList.remove("enemy");
                    invadersArray.splice(i, 1);
                    console.log(invadersArray)
                    enemys[i].remove();
                    bullet.remove();
                    bulletsArray = [];

                    score++

                    document.querySelector(".score").innerHTML = score;

                    if (invadersArray.length === 0){
                        document.querySelector(".result").innerHTML = "YOU WIN";
                        document.removeEventListener("keydown", moveUser);
                        document.removeEventListener("click", createBullets);
                        clearInterval(moveBulletInterval);
                        clearInterval(moveEnemyInterval);
                        document.querySelector(".descripction button").style.display = "block";

                    }
            }
        }
    });


    for (i = 0; i < enemys.length; i++){
        const enemyPosition = enemys[i].getBoundingClientRect();

        if (userPosition.x > enemyPosition.x + enemyPosition.width ||
            userPosition.x + userPosition.width < enemyPosition.x ||
            userPosition.y > enemyPosition.y + enemyPosition.height ||
            userPosition.y + userPosition.height < enemyPosition.y
            ){
            } else {
                clearInterval(moveBulletInterval);
                clearInterval(moveEnemyInterval);
                document.querySelector(".result").innerHTML = "YOU LOSE";
                document.removeEventListener("keydown", moveUser);
                document.removeEventListener("click", createBullets);
                document.querySelector(".descripction button").style.display = "block";
            }
    }




}

function playAgain(){
    window.location.reload()
}

// call f 
createEnemys();
createUser();

// Events
document.addEventListener("keydown", moveUser);
document.querySelector(".descripction button").addEventListener("click", playAgain);


// intervals
moveBulletInterval = setInterval(moveBullet, 50);
moveEnemyInterval = setInterval(moveEnemys, 500);










