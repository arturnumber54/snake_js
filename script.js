//
// Создание класса
//
function Matrix(containerId, rows, cols) {
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
	// Задаем координаты игрока и мишени.
	var pl_x = 3;
	var pl_y = 2;
	var target_x = 15;
	var target_y = 16;
	// Добавляем на поле игрока и мишень.
	m1.setCell(pl_x, pl_y, true);
	m1.setCell(target_x, target_y, true);
	// Обрабатываем нажание клавиш.
	window.onkeydown = function() {
		var key = event.keyCode;
		if ((pl_x == target_x) && (pl_y == target_y))
			alert("Игра окончена, товарищ!");
		else {
			m1.setCell(pl_x, pl_y, false);
			if (key == 37)
				pl_y -= 1;
			if (key == 38)
				pl_x -= 1;
			if (key == 39)
				pl_y += 1;
			if (key == 40)
				pl_x += 1;

			if (pl_x > 20)
				pl_x = 20;
			if (pl_x < 1)
				pl_x = 1;
			if (pl_y > 20)
				pl_y = 20;
			if (pl_y < 1)
				pl_y = 1;
			m1.setCell(pl_x, pl_y, true);		
		}
	}
}				
