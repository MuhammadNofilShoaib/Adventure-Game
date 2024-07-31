#!/usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    healthDecrease() {
        this.health -= 25;
    }
    healthIncrease() {
        if (this.health < 100) {
            this.health = 100;
            console.log(chalk.bold.italic.greenBright(`\tHealth Restored!`));
        }
        else {
            console.log(chalk.bold.italic.greenBright(`\tYour health is already full!`));
        }
    }
}
console.log(chalk.bold.italic.yellowBright(`\t\n\tADVENTURE GAME`));
let menu = await inquirer.prompt([
    {
        name: "choose",
        type: "list",
        message: "\nSelect: ",
        choices: [`Start Game`, `Exit`]
    }
]);
if (menu.choose == `Start Game`) {
    console.log(chalk.bold.italic.yellowBright(`\nStep cautiously as you enter the heart of darkness—every shadow holds a secret, and every whisper could be your last.`));
    startGame();
}
else {
    console.log(chalk.bold.italic.redBright(`Exiting...`));
}
async function startGame() {
    let inputA = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "\nEnter your name: "
        },
        {
            name: "select",
            type: "list",
            message: "\nSelect your Opponent: ",
            choices: [`Stealthy Assassin`, `Brute Warrior`, `Cunning Sorcerer`]
        }
    ]);
    let p1 = new Player(inputA.name);
    let o1 = new Player(inputA.select);
    while (true) {
        let inputB = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "\nChoose your action: ",
                choices: [`Attack`, `Drink Health Potion`, `Run Away`]
            }
        ]);
        if (inputB.action == `Attack`) {
            let randNum = Math.floor(Math.random() * 2);
            if (randNum > 0) {
                o1.healthDecrease();
                console.log(chalk.bold.italic.greenBright(`${p1.name} health is ${p1.health}`));
                console.log(chalk.bold.italic.redBright(`${o1.name} health is ${o1.health}`));
                if (o1.health <= 0) {
                    console.log(chalk.bold.italic.blueBright(`\nYou beat ${o1.name}, You WIN!`));
                    process.exit();
                }
            }
            else {
                p1.healthDecrease();
                console.log(chalk.bold.italic.redBright(`${p1.name} health is ${p1.health}`));
                console.log(chalk.bold.italic.greenBright(`${o1.name} health is ${o1.health}`));
                if (p1.health <= 0) {
                    console.log(chalk.bold.italic.redBright(`\nYou loose, better luck next time!`));
                    process.exit();
                }
            }
        }
        else if (inputB.action == `Drink Health Potion`) {
            p1.healthIncrease();
        }
        else {
            console.log(chalk.bold.italic.redBright(`\nYou loose, better luck next time!`));
            process.exit();
        }
    }
}
