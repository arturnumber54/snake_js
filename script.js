$(document).ready(function() {
	//
	// Создание класса Matrix.
	//
	function Matrix(matrixId, col, row) {
		// id матрицы.
		this.matrixId = matrixId;

		// Количество столбцов в матрице.
		this.col = col;

		// Количество строк в матрице.
		this.row = row;

		// Функция создания матрицы.
		this.create = function() {
			var n = this.col * this.row; // вычисляем количество элементов
			var matrix = $('#' + this.matrixId + '');
			for(var i = 0; i < n; i++) {
				matrix.append('<div class="cell"></div>');
			}
		}

		// Функция проверки закраски ячейки
		this.getCell = function(col, row, cls) {
			var ind = (row - 1) * this.col + col - 1;
			var cell = $('#' + this.matrixId + '> div').eq(ind);

			if (cell.hasClass(''+ cls +''))
				return true;
			else
				return false;
		}

		// Функция добавления закраски ячейки
		this.setCell = function(col, row, val) {
			var ind = (row - 1) * this.col + col - 1;
			var cell = $('#' + this.matrixId + '> div').eq(ind);

			if (val)
				cell.addClass('on');
			else
				cell.removeClass('on');
		}

		// Функция добавления фруктов
		this.addFruit = function() {
			var min = 0;
			var max = (this.row - 1) * this.col + this.col - 1;
			var randonNum = Math.floor(Math.random() * (max - min + 1)) + min;
			var cell = $('#' + this.matrixId + '> div').eq(randonNum);
			cell.addClass('fruit');
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

		// Функция создания змейки.
		this.createSnake = function(lenSnake, matrix) {
			for (var i = 0; i < lenSnake; i++) {
				if (that.course == 'right')
					that.snake.push({x:(that.x - i), y:that.y});
				if (that.course == 'left')
					that.snake.push({x:(that.x + i), y:that.y});
				if (that.course == 'up')
					that.snake.push({x:that.x, y:(that.y + i)});
				if (that.course == 'down')
					that.snake.push({x:that.x, y:(that.y - i)});
			}
			for (var j = 0; j < that.snake.length; j++) {
				matrix.setCell(that.snake[j].x, that.snake[j].y, true);
			}
		}

		// Функция передвижения змейки
		this.moveSnake = function(matrix, speed) {
			var score = 0;
			var intervalId = setInterval(function(){
				if (that.course == 'right')
					that.x++;
				if (that.course == 'left')
					that.x--;
				if (that.course == 'up')
					that.y--;
				if (that.course == 'down')
					that.y++;

				if (matrix.getCell(that.x, that.y, 'fruit')) {
					that.snake.unshift({x:that.x, y:that.y});
					var ind = (that.y - 1) * matrix.col + that.x - 1;
					var cell = $('#' + matrix.matrixId + '> div').eq(ind);
					cell.removeClass('fruit');
					matrix.addFruit();
					score += 100;
					$('#score').html(score);
				}
				
				if ((that.x > matrix.row) || (that.y > matrix.col) || (that.x < 1) || (that.y < 1) ||
									matrix.getCell(that.x, that.y, 'on')) {
					clearInterval(intervalId);
					alert('Игра окончена!');
				}
				else {
					matrix.setCell(that.snake[(that.snake.length - 1)].x, that.snake[(that.snake.length - 1)].y, false);
					that.snake.unshift({x:that.x, y:that.y});
					that.snake.pop();
					matrix.setCell(that.snake[0].x, that.snake[0].y, true);
				}
			}, speed);
		}

		// Функция обработки нажатия клавиш.
		this.controlSnake = function(e) {
			e = e || window.event;
			var key = e.keyCode || e.which;
			if ( ((key == 37) || (key == 65)) && (that.course != 'right'))
				that.course = 'left';
			if ( ((key == 38) || (key == 87)) && (that.course != 'down'))
				that.course = 'up';
			if ( ((key == 39) || (key == 68)) && (that.course != 'left'))
				that.course = 'right';
			if ( ((key == 40) || (key == 83)) && (that.course != 'up'))
				that.course = 'down';
		}

		// Функция роста змейки
		this.growSnake = function(xg, yg) {
			that.snake.unshift({x:xg, y:yg});
		}
	}


	//
	// Функция - ядро игры
	//
	function gamePlay(matrix, snake, speed) {
		// Создаем поле
		matrix.create();
		// Создаем фрукт
		matrix.addFruit();

		// Создаем змейку
		snake.createSnake(3, matrix);
		// Вызываем функцию движения
		snake.moveSnake(matrix, speed);
		// Вешаем реакцию на события клавиатуры
		$(document).keydown(snake.controlSnake);
	}

	// Создаем экземпляр класса Matrix
	var matrix = new Matrix('matrix1', 40, 40);

	// Создаем экземпляр класса Snake
	var snake = new Snake(3, 35, 'right');
	
	// Запускаем игру
	$('#oldMan').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 500);
	});
	$('#noob').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 200);
	});
	$('#amateur').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 100);
	});
	$('#pro').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 30);
	});
	$('#master').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 15);
	});
	$('#superman').click(function() {
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, 7);
	});
});