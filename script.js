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
		this.body = [];

		// Начальное направление движения.
		this.course = course;

		// Жизнь змейки.
		this.alive = true;

		// Функция создания змейки.
		this.createSnake = function(lenSnake, matrix) {
			that.body = [];
			for (var i = 0; i < lenSnake; i++) {
				if (that.course == 'right')
					that.body.push({x:(that.x - i), y:that.y});
				if (that.course == 'left')
					that.body.push({x:(that.x + i), y:that.y});
				if (that.course == 'up')
					that.body.push({x:that.x, y:(that.y + i)});
				if (that.course == 'down')
					that.body.push({x:that.x, y:(that.y - i)});
			}
			for (var j = 0; j < that.body.length; j++) {
				matrix.setCell(that.body[j].x, that.body[j].y, true);
			}
		}

		// Функция передвижения змейки
		this.moveSnake = function(matrix) {
			if (that.course == 'right')
				that.x++;
			if (that.course == 'left')
				that.x--;
			if (that.course == 'up')
				that.y--;
			if (that.course == 'down')
				that.y++;
			// Проверка наезда на себя
			if (matrix.getCell(that.x, that.y, 'on')) {
				that.alive = false;
			}
			
			matrix.setCell(that.body[(that.body.length - 1)].x, that.body[(that.body.length - 1)].y, false);
			that.body.unshift({x:that.x, y:that.y});
			that.body.pop();
			matrix.setCell(that.body[0].x, that.body[0].y, true);		
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
			that.body.unshift({x:xg, y:yg});
		}
	}

	//
	// Функция - ядро игры
	//
	function gamePlay(matrix, snake, speed) {	
		// Добавляем поле
		matrix.create();
		
		// Добавляем фрукт
		matrix.addFruit();

		// Добавляем змейку
		snake.createSnake(3, matrix);
		
		// Вешаем реакцию на события клавиатуры
		$(document).keydown(snake.controlSnake);
		var score = 0;
		var intervalId = setInterval(function(){
			if (matrix.getCell(snake.x, snake.y, 'fruit')) {
				snake.body.unshift({x:snake.x, y:snake.y});
				var ind = (snake.y - 1) * matrix.col + snake.x - 1;
				var cell = $('#' + matrix.matrixId + '> div').eq(ind);
				cell.removeClass('fruit');
				matrix.addFruit();
				score += 100;
			}
			if( ((snake.x >= matrix.col) && (snake.course == 'right')) 
				|| ((snake.y >= matrix.row) && (snake.course == 'down'))
				|| ((snake.x <= 1) && (snake.course == 'left'))
				|| ((snake.y <= 1) && (snake.course == 'up')) || !(snake.alive) )
			{
				clearInterval(intervalId);
				$('#gameover').fadeTo(1500, 0.7);
			}
			else {
				// Вызываем функцию движения
				snake.moveSnake(matrix);
			}
			$('#score').html(score);
		}, speed);
	}

//
// Точка входа.
//
	// Создаем экземпляр класса Matrix
	var matrix = new Matrix('matrix1', 40, 40);

	// Создаем экземпляр класса Snake
	var snake = new Snake(3, 35, 'right');
	
	var speed = 100;

	// Запускаем игру
	$('#oldMan').click(function() {
		speed = 500;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});
	$('#noob').click(function() {
		speed = 200;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});
	$('#amateur').click(function() {
		speed = 100;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});
	$('#pro').click(function() {
		speed = 30;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});
	$('#master').click(function() {
		speed = 15;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});
	$('#superman').click(function() {
		speed = 7;
		$('#start').css({'display':'none'});
		$('#container').css({'display':'block'});
		gamePlay(matrix, snake, speed);
	});

	$('#more').click(function() {
		$('#gameover').css({'display':'none'});
		$('#matrix1').empty();
		snake.x = 3;
		snake.y = 35;
		snake.course = 'right';
		snake.alive = true;
		gamePlay(matrix, snake, speed);
	});
	$('#main').click(function() {
		$('#matrix1').empty();
		$('#gameover').css({'display':'none'});
		$('#container').css({'display':'none'});
		$('#start').css({'display':'block'});
		snake.x = 3;
		snake.y = 35;
		snake.course = 'right';
		snake.alive = true;
	});
});