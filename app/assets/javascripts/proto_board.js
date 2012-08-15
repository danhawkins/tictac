var ProtoBoard = {
	combinations: [ ['0_0','0_1','0_2'], ['1_0','1_1','1_2'], ['2_0','2_1','2_2'],['0_0','1_0','2_0'],['0_1','1_1','2_1'],['0_2','1_2','2_2'],['0_0','1_1','2_2'],['0_2','1_1','2_0']],
	blank: 0,
	human: 1,
	computer: 2,
	current_game: [],

	init: function(){
		this.current_game = [];
		this.bindCells();
	},

	bindCells: function(){
		$('#gameboard .cell').live('click',function(){
			$(this).text('o');
		})
	}

};

$(ProtoBoard.init());