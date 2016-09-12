//
// Создание класса Matrix
//
function Matrix(containerId, rows, cols) {
	// то = это;
	var that = this;

	// id контейнера матрицы
	this.containerId = containerId;

	// Количество строк в матрице
	this.rows = rows;

	// Количество столбцов в матрице
	this.cols = cols;

	// Функция создания матрицы
	this.create = function() {
		var matrix = document.getElementById(this.containerId);
		var n = this.rows * this.cols;

		matrix.innerHTML = '';

		for(var i = 0; i < n; i++) {
			var div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div);
		}
	}

	// Функция проверки закраски ячейки
	this.getCell = function(row, col) {
		var ind = (row - 1) * this.cols + col - 1;
		var matrix = document.getElementById(this.containerId);
		var cell = matrix.children[ind];

		if (cell.className == 'cell on')
			return true;
		else
			return false;
	}

	// Функция для закраски и удаления закраски
	this.setCell = function(row, col, val) {
		var ind = (row - 1) * this.cols + col - 1;
		var matrix = document.getElementById(this.containerId);
		var cell = matrix.children[ind];

		if (val)
			cell.className = 'cell on';
		else
			cell.className = 'cell';
	}

	// Функция добавления фрукта в случайном месте.
	this.addFruit = function() {
		var min = 0;
		var max = 399;
		var randonNum = Math.floor(Math.random() * (max - min + 1)) + min;
		var matrix = document.getElementById(that.containerId);
		var cell = matrix.children[randonNum];
		cell.className = 'cell fruit';
	}
}

//
// Создание класса Snake.
//
function Snake(x, y, course) {
	// то = это;
	var that = this;

	// Начальная координата головы змейки (x).
	this.x = x;

	// Начальная координата головы змейки (y).
	this.y = y;

	// Массив с координатами всех элементов змейки.
	this.snake = [];

	// Начальное направление движения.
	this.course = course;

	// Функция отрисовки тела змейки.
	this.addBody = function(arr) {
		var matrix = document.getElementById('matrix1');
		
		for (var j = 0; j < 400; j++) {
			var cell = matrix.children[j];
			var cls = cell.className;
			var arrCls = cls.split(' '); // Создаем массив из названия класса по пробелу.
			arrCls.forEach(function(item, i, arrCls) {
				if (item == 'on')
					delete arrCls[i]; // Удаляем элемент со значением 'on'.
			});
			cell.className = arrCls.join(' '); // Создаем строку из полученного массива.
		}

		for (var i = 0; i < arr.length; i = i + 2) {
			var ind = (arr[i + 1] - 1) * 20 + arr[i] - 1;
			var cell = matrix.children[ind];
			cell.className = 'cell on';
		}
	}

	// Функция движения змейки.
	this.gamePlay = function() {
		setInterval(function(){
			if (that.course == 'right') {
				that.x++;
			}
			if (that.course == 'left') {
				that.x--;
			}
			if (that.course == 'up') {
				that.y--;
			}
			if (that.course == 'down') {
				that.y++;
			}
			that.snake.unshift(that.y);
			that.snake.unshift(that.x);
			that.snake.pop();
			that.snake.pop();
			that.addBody(that.snake);
		}, 1000);
	}

	// Функция создания змейки.
	this.createSnake = function(lenSnake) {
		for (var i = 0; i < lenSnake; i++) {
			that.snake.push(that.x - i);
			that.snake.push(that.y);
		}
		that.addBody(that.snake);
	}

	// Функция обработки нажатия клавиш.
	this.controlSnake = function() {
		var key = event.keyCode;
		if ((key == 37) && (that.course != 'right'))
			that.course = 'left';
		if ((key == 38) && (that.course != 'down'))
			that.course = 'up';
		if ((key == 39) && (that.course != 'left'))
			that.course = 'right';
		if ((key == 40) && (that.course != 'up'))
			that.course = 'down';
	}
}

//
// Точка входа.
//
window.onload = function()
{
	// Создаем экземпляр класса Matrix
	var m1 = new Matrix('matrix1', 20, 20);

	// Создаем поле.
	m1.create();	
	
	// Создаем экземпляр класса Snake
	var s1 = new Snake(10, 10, 'right');// По умолчанию 'right' (остальное пока не сделано)

	// Создаем тело змейки.
	s1.createSnake(4);
	s1.gamePlay();
	window.onkeydown = s1.controlSnake;

	// Создаем фрукт.
	m1.addFruit();
	
}				
