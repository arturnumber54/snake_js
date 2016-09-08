//
// �������� �������.
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
// ������ ������ �������.
//
function getCell(row, col)
{
	// ������� ��������� ���������� ������
	// ������ ������� true, ���� ��� ���������,
	// false, ���� �� ���������.
	
	var numCell = (( col + (20 * (row - 1)) ) - 1);
	var matrix = document.getElementById('matrix');
	if (matrix.children[numCell].className == 'cell bg')
		return true;
	else
		return false;
}

//
// ��������� ������ �������.
//
function setCell(row, col, val)
{ 
	// ������� ��������� ���������� ������
	// ���� val == true, ����������� ������,
	// ����� ������� ��������.

	var numCell = (( col + (20 * (row - 1)) ) - 1);
	var matrix = document.getElementById('matrix');
	if (val == true)
		matrix.children[numCell].className = 'cell bg';
	else
		matrix.children[numCell].className = 'cell';

}

// ������� ��������� ������ ��� �����.
function setVCell(row, col, val)
{ 
	// ������� ��������� ���������� ������
	// ���� val == true, ����������� ������,
	// ����� ������� ��������.

	var numCell = (( col + (20 * (row - 1)) ) - 1);
	var matrix = document.getElementById('matrix');
	if (val == true)
		matrix.children[numCell].className = 'cell victim';
	else
		matrix.children[numCell].className = 'cell';

}

// ������� ���������� �� ������� �� ������.
function getVCell(row, col)
{
	// ������� ��������� ���������� ������
	// ������ ������� true, ���� ��� ���������,
	// false, ���� �� ���������.
	
	var numCell = (( col + (20 * (row - 1)) ) - 1);
	var matrix = document.getElementById('matrix');
	if (matrix.children[numCell].className == 'cell victim')
		return true;
	else
		return false;
}

// ������� ������������ ������.
function moveCell(row, col, key) {
	setCell(row, col, false);

	if (key == 37)
		col -= 1;
	if (key == 38)
		row -= 1;
	if (key == 39)
		col += 1;
	if (key == 40)
		row += 1;

	if (row > 20)
		row = 20;
	if (row < 1)
		row = 1;
	if (col > 20)
		col = 20;
	if (col < 1)
		col = 1; 

	if (getVCell(row, col))
		alert('���� ��������!');
	setCell(row, col, true);
}

//
// ����� �����.
//
window.onload = function()
{
	createMatrix();	
	setCell(3, 2, true);
	setVCell(19, 18, true);
	
	onkeydown = function() {
		k = event.keyCode;
		for (var x = 1; x <= 20; x++ ){
			for (var y = 1; y <= 20; y++){
				if (getCell(x, y)) {
					var work_x = x;
					var work_y = y;
				}
			}
		}
		moveCell(work_x, work_y, k);	
	}
}				
