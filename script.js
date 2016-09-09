//
// Создание матрицы.
//
function createMatrix()
{
	var matrix = document.getElementById('matrix');
	var n = 20 * 20;	
	
	for (var i = 0; i < n; i++)
	{
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
}

//
// Определение индекса ячейки.
//
function indexCell(row, col) {
	return ( (col - 1) + (20 * (row - 1)) );
}

//
// Чтение ячейки матрицы.
//
function getCell(row, col)
{
	// Функция принимает координаты ячейки
	// должна вернуть true, если она закрашена,
	// false, если не закрашена.
	
	var matrix = document.getElementById('matrix');
	if (matrix.children[indexCell(row, col)].className == 'cell bg')
		return true;
	else
		return false;
}

//
// Установка ячейки матрицы.
//
function setCell(row, col, val)
{ 
	// Функция принимает координаты ячейки
	// если val == true, закрашивает ячейку,
	// иначе убирает закраску.

	var matrix = document.getElementById('matrix');
	if (val == true)
		matrix.children[indexCell(row, col)].className = 'cell bg';
	else
		matrix.children[indexCell(row, col)].className = 'cell';

}

//
// Точка входа.
//
window.onload = function()
{
	// Создаем поле.
	createMatrix();	
	// Задаем координаты игрока и мишени.
	var pl_x = 3;
	var pl_y = 2;
	var target_x = 15;
	var target_y = 16;
	// Добавляем на поле игрока и мишень.
	setCell(pl_x, pl_y, true);
	setCell(target_x, target_y, true);
	// Обрабатываем нажание клавиш.
	window.onkeydown = function() {
		var key = event.keyCode;
		if ((pl_x == target_x) && (pl_y == target_y))
			alert("Игра окончена, товарищ!");
		else {
			setCell(pl_x, pl_y, false);
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
			setCell(pl_x, pl_y, true);		
		}
	}
}				
