import * as PIXI from 'pixi.js';
import Figure from './Figure/Figure';
import {randomColor, randomNumberForRange, onDecrementValue, onIncrementValue} from './functions';

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('.canvas');
    const gravityChanger = document.querySelector('.js-gravity');
    const incrementGravity = document.querySelector('.js-increase-gravity');
    const decrementGravity = document.querySelector('.js-decrease-gravity');
    const incrementAmount = document.querySelector('.js-increase-amount');
    const decrementAmount = document.querySelector('.js-decrease-amount');
    const amountChanger = document.querySelector('.js-amount');
    const quantity = document.querySelector('.js-quantity');
    const area = document.querySelector('.js-area');

//Create a Pixi Application
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        antialias: true,
        transparent: false,
        resolution: 1
    });
    canvas.appendChild(app.view);
    const parent = app.stage;
/// Get mouse position
    const getMousePosition = () => app.renderer.plugins.interaction.mouse.global;
    /// Canvas cotainer
    const container = new PIXI.Graphics();
    container.interactive = true;
    container.beginFill(0xffffff);
    container.drawRect(0, 0, app.renderer.width, app.renderer.height);
    app.stage.addChild(container);
    const figures = ['triangle', 'rectangle', 'circle', 'ellipse', 'fiveSides', 'sixSides', 'randomShape'];
    const randomFigure = () => figures[randomNumberForRange(0, 7)];
    // Add new figure on mouse click
    container.on('pointerup', event => {
        gravity = parseInt(gravityChanger.value);
        const {x, y} = getMousePosition();
        const newFigure = new Figure(parent, randomFigure(), x, y, randomColor(), gravity * 0.5);
        app.stage.addChild(newFigure);
    });

/// Falling proccess
    let count = 0;
    const falling = (gravity) => {
        count = 1;
        const newFigure = new Figure(parent, randomFigure(), randomNumberForRange(0, 800), 0, randomColor(), gravity * 0.5);
        app.stage.addChild(newFigure);
        app.renderer.render(newFigure);
        app.stage.children.map(figure => {
            if (figure.y > 800) {
                figure.parent.removeChild(figure);
            }
        });
    };
/// Quantity of items on a stage
    app.ticker.add(() => {
        quantity.innerHTML = app.stage.children.length - 1;
    });
//// Area on items on a stage
    let number = n => isNaN(n) ? 0 : n;

    app.ticker.add(() => {
        const areas = app.stage.children.map(figure => figure.area);
        area.innerHTML = areas.reduce((total, figureArea) => number(total) + number(figureArea));
    });
//// Changes of gravity and amount of figures
    let gravity = parseInt(gravityChanger.value);
    let amount = parseInt(amountChanger.value);
    decrementGravity.addEventListener('click', () => onDecrementValue(gravityChanger));
    incrementGravity.addEventListener('click', () => onIncrementValue(gravityChanger));
    decrementAmount.addEventListener('click', () => onDecrementValue(amountChanger));
    incrementAmount.addEventListener('click', () => onIncrementValue(amountChanger));
    gravityChanger.addEventListener('change', function () {
        clearInterval(interval);
        amount = parseInt(amountChanger.value);
        amount = isNaN(amount) ? 0 : amount;
        interval = setInterval(falling, 1 / amount * 1000, parseInt(this.value) * 0.5);
    });
    amountChanger.addEventListener('change', function () {
        clearInterval(interval);
        gravity = parseInt(gravity);
        gravity = isNaN(gravity) ? 0 : gravity;
        interval = setInterval(falling, 1 / this.value * 1000, gravity * 0.5);
    });
/// Start of default fall
    let interval = setInterval(falling, amount * 1000, gravity * 0.5);
});
