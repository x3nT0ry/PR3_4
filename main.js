import { generateLog } from "./logs.js";

document.addEventListener("DOMContentLoaded", function () {
    const $btn = document.getElementById("btn-kick");
    const $btnSpecial = document.getElementById("btn-special");
    const $logs = document.getElementById("logs");

    const createClickCounter = (maxClicks) => {
        let count = 0;

        return () => {
            if (count < maxClicks) {
                count++;
                console.log(
                    `Кліків: ${count}, Залишилось: ${maxClicks - count}`
                );
                return true;
            } else {
                console.log("Максимальна кількість натискань досягнута.");
                return false;
            }
        };
    };

    const kickCounter = createClickCounter(6);
    const specialCounter = createClickCounter(6);

    const createCharacter = ({ name, defaultHP, elHPId, elProgressbarId }) => {
        const elHP = document.getElementById(elHPId);
        const elProgressbar = document.getElementById(elProgressbarId);

        return {
            name,
            defaultHP,
            damageHP: defaultHP,
            elHP,
            elProgressbar,

            renderHP() {
                this.renderHPLife();
                this.renderProgressbarHP();
            },

            renderHPLife() {
                this.elHP.innerText = `${this.damageHP}/${this.defaultHP}`;
            },

            renderProgressbarHP() {
                this.elProgressbar.style.width = `${
                    (this.damageHP / this.defaultHP) * 100
                }%`;
            },

            changeHP(count) {
                if (this.damageHP < count) {
                    this.damageHP = 0;
                    alert(`Бедний ${this.name} програв бій!`);
                    $btn.disabled = true;
                    $btnSpecial.disabled = true;
                } else {
                    this.damageHP -= count;
                }
                this.renderHP();
            },
        };
    };

    const {
        name: characterName,
        defaultHP: characterDefaultHP,
        elHPId: characterElHPId,
        elProgressbarId: characterElProgressbarId,
    } = {
        name: "Pikachu",
        defaultHP: 100,
        elHPId: "health-character",
        elProgressbarId: "progressbar-character",
    };

    const {
        name: enemyName,
        defaultHP: enemyDefaultHP,
        elHPId: enemyElHPId,
        elProgressbarId: enemyElProgressbarId,
    } = {
        name: "Charmander",
        defaultHP: 100,
        elHPId: "health-enemy",
        elProgressbarId: "progressbar-enemy",
    };

    const character = createCharacter({
        name: characterName,
        defaultHP: characterDefaultHP,
        elHPId: characterElHPId,
        elProgressbarId: characterElProgressbarId,
    });

    const enemy = createCharacter({
        name: enemyName,
        defaultHP: enemyDefaultHP,
        elHPId: enemyElHPId,
        elProgressbarId: enemyElProgressbarId,
    });

    function init() {
        console.log("Початок гри!");
        character.renderHP();
        enemy.renderHP();
    }

    const random = (num) => Math.ceil(Math.random() * num);

    function addLog(log) {
        const logEntry = document.createElement("p");
        logEntry.innerText = log;
        $logs.prepend(logEntry);
    }

    $btn.addEventListener("click", function () {
        if (kickCounter()) {
            const damageCharacter = random(20);
            const damageEnemy = random(20);

            character.changeHP(damageCharacter);
            enemy.changeHP(damageEnemy);

            const characterLog = generateLog(character, enemy, damageCharacter);
            const enemyLog = generateLog(enemy, character, damageEnemy);

            addLog(characterLog);
            addLog(enemyLog);
        }
    });

    function randomTarget() {
        return Math.random() < 0.5 ? character : enemy;
    }

    $btnSpecial.addEventListener("click", function () {
        if (specialCounter()) {
            const target = randomTarget();
            const damage = 20;
            target.changeHP(damage);

            const log = generateLog(
                target,
                target === character ? enemy : character,
                damage
            );
            addLog(log);
        }
    });

    init();
});
