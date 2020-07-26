import * as PIXI from 'pixi.js';
import {removeGraphic, changeColor} from '../utils'

let ticker = PIXI.Ticker.shared;

class Figure extends PIXI.Graphics {
    constructor(parent, type, xPos, yPos, color, gravity) {
        super();
        this.parent = parent;
        this.gravity = gravity;
        this.interactive = true;
        this.buttonMode = true;
        this.color = color;
        switch (type) {
            case 0:
                this.type = 'triangle';
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
            case 1:
                this.type = 'rectangle';
                this.area = 1600;
                this.x = xPos;
                this.y = yPos - 40;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawRect(0, 0, 40, 40, color);
                this.endFill();
                break;
            case 2:
                this.type = 'circle';
                this.area = 1963;
                this.x = xPos;
                this.y = yPos - 25;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawCircle(0, 0, 25);
                this.endFill();
                break;
            case 3:
                this.type = 'ellipse';
                this.area = 3534;
                this.x = xPos;
                this.y = yPos - 25;
                this.beginFill(color, 1);
                this.lineStyle(0, color, 1);
                this.drawEllipse(0, 0, 45, 25);
                this.endFill();
                break;
            case 4:
                this.type = 'fiveSides';
                this.x = xPos;
                this.y = yPos - 60;
                this.area = 3075;
                this.lineStyle(0, color, 1);
                const fivePath = [0, 0, 30, 0, 55, 35, 30, 60, -30, 35];
                this.beginFill(color, 1);
                this.drawPolygon(fivePath);
                this.endFill();
                break;
            case 5:
                this.type = 'sixSides';
                this.area = 3455;
                this.x = xPos;
                this.y = yPos - 60;
                this.lineStyle(0, color, 1);
                const sixPath = [0, 0, 30, 0, 55, 30, 30, 60, 0, 60, -30, 30];
                this.beginFill(color, 1);
                this.drawPolygon(sixPath);
                this.endFill();
                break;
        }
        this.on('pointerup', removeGraphic);
        this.on('pointerdown', changeColor);
        ticker.add(() => {
            this.y += this.gravity;
        });
    }
}

export default Figure;