import * as PIXI from 'pixi.js';
import {removeGraphic, changeColor} from '../functions'

let ticker = PIXI.Ticker.shared;

class Figure extends PIXI.Graphics {
    constructor(parent, type, xPos, yPos, color, gravity) {
        super();
        this.parent = parent;
        this.interactive = true;
        this.buttonMode = true;
        this.color = color;
        this.type = type;
        console.log(this);
        switch (this.type) {
            case 'triangle':
                this.area = 625;
                this.x = xPos;
                this.y = yPos - 50;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.moveTo(50, 0);
                this.lineTo(25, 50);
                this.lineTo(0, 0);
                this.lineTo(25, 0);
                this.endFill();
                break;
            case 'rectangle':
                this.area = 1600;
                this.x = xPos;
                this.y = yPos - 40;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawRect(0, 0, 40, 40, color);
                this.endFill();
                break;
            case 'circle':
                this.area = 1963;
                this.x = xPos;
                this.y = yPos - 25;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawCircle(0, 0, 25);
                this.endFill();
                break;
            case 'ellipse':
                this.area = 3534;
                this.x = xPos;
                this.y = yPos - 25;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawEllipse(0, 0, 45, 25);
                this.endFill();
                break;
            case 'fiveSides':
                this.x = xPos;
                this.y = yPos - 60;
                this.area = 3075;
                this.lineStyle(0, color, 1);
                const fivePath = [0, 0, 30, 0, 55, 35, 30, 60, -30, 35];
                this.beginFill(color, 1);
                this.drawPolygon(fivePath);
                this.endFill();
                break;
            case 'sixSides':
                this.area = 3455;
                this.x = xPos;
                this.y = yPos - 60;
                this.lineStyle(0, color, 1);
                const sixPath = [0, 0, 30, 0, 55, 30, 30, 60, 0, 60, -30, 30];
                this.beginFill(color, 1);
                this.drawPolygon(sixPath);
                this.endFill();
                break;
            case 'randomShape':
                this.area = 2534;
                this.x = xPos;
                this.y = yPos - 25;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawStar(0, 0, 6, 35);
                this.endFill();
                break;
        }
        this.on('pointerup', removeGraphic);
        this.on('pointerdown', changeColor);
        ticker.add(() => {
            this.y += gravity;
        });
    }
}

export default Figure;