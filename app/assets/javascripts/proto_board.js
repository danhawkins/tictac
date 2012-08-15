var ProtoBoard = {
	combinations: [ ['0_0','0_1','0_2'], ['1_0','1_1','1_2'], ['2_0','2_1','2_2'],['0_0','1_0','2_0'],['0_1','1_1','2_1'],['0_2','1_2','2_2'],['0_0','1_1','2_2'],['0_2','1_1','2_0']],
	blank: '',
	human: 'X',
	computer: 'O',
	human_cells: [],
	computer_cells: [],
	computer_moved: false,

	init: function(){

		ProtoBoard.current_game = [];
		ProtoBoard.bindCells();
	},

	bindCells: function(){
		$('#gameboard .cell').live('click',function(){
			ProtoBoard.human_cells.push($(this).attr('id'));

			$(this).text(ProtoBoard.human);
			console.log(ProtoBoard.current_game);

			ProtoBoard.computer_moved = false;
			ProtoBoard.computerMove();
		});
	},

	computerMove: function(){

	},

	checkForWin: function(){

	},

	blockHumanWin: function(){

	},

	placeRandom: function(){

	}

};

$(ProtoBoard.init());