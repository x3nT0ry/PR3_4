function random(num) {
    return Math.ceil(Math.random() * num);
}
function generateLog(
    { name: firstName, damageHP: firstDamageHP, defaultHP: firstDefaultHP },
    { name: secondName },
    damage
) {
    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstName} поперхнулся, и за это ${secondName} с испуга приложил прямой удар коленом в лоб врага.`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком <вырезано цензурой> противника.`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника.`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`,
    ];

    const log = logs[random(logs.length) - 1];
    const losstInfo = `Завдано втрат: ${damage}, залишилось HP: ${firstDamageHP}/${firstDefaultHP}`;

    return `${log} ${losstInfo}`;
}

export { generateLog };
