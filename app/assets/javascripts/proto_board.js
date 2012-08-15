var ProtoBoard = {
	combinations: [ ['0_0','0_1','0_2'], ['1_0','1_1','1_2'], ['2_0','2_1','2_2'],['0_0','1_0','2_0'],['0_1','1_1','2_1'],['0_2','1_2','2_2'],['0_0','1_1','2_2'],['0_2','1_1','2_0']],
	blank: '',
	human: 'X',
	computer: 'O',
	moves: {},
	computer_moved: false,

	computer_wins: 0,
	human_wins: 0,
	ties: 0,

	init: function(){

		ProtoBoard.current_game = [];
		ProtoBoard.bindCells();
		ProtoBoard.bindControls();
	},

	bindCells: function(){
		$('#gameboard .cell').die();
		$('#gameboard .cell').live('click',function(){
			if($('#reset_game').is(':hidden')) $('#reset_game').show();

			ProtoBoard.moves[$(this).attr('id')] = ProtoBoard.human

			$(this).text(ProtoBoard.human);

			ProtoBoard.computer_moved = false;

			if(ProtoBoard.checkForTie()){
				ProtoBoard.gameEnded(0);
			}else{
				result = ProtoBoard.computerMove();
				if(result != 1){
					ProtoBoard.gameEnded(result);
				}
			}
		});
	},

	bindControls: function(){
		$('#reset_game').live('click', function(e){
			ProtoBoard.resetGame();
			return false;
		});
	},

	resetGame: function(){
		ProtoBoard.moves = {};
		$('#gameboard .cell').text('');
		$('#reset_game').hide();
		ProtoBoard.bindCells();
	},

	computerMove: function(){
		pre_state = ProtoBoard.checkGameState();
		if(pre_state == 1){			
			if(!ProtoBoard.tryComputerWin() && !ProtoBoard.blockHumanWin() ){
				ProtoBoard.computerRandomMove();
			}
			return ProtoBoard.checkGameState();
		}else{
			return pre_state;
		}
	},

	checkGameState: function(){
		if(ProtoBoard.checkForTie()) return 0;
		if(ProtoBoard.checkForWin(ProtoBoard.human)) return ProtoBoard.human;
		if(ProtoBoard.checkForWin(ProtoBoard.computer)) return ProtoBoard.computer;
		return 1;
	},

	checkForTie: function(){
		if(_.keys(ProtoBoard.moves).length == 9) return true;
		return false;
	},

	checkForWin: function(xo){
		found_matches = _.select(_.keys(ProtoBoard.moves), function(item){
			return ProtoBoard.moves[item] === xo;
		});

		for(i = 0; i < ProtoBoard.combinations.length; i++){
			combination = ProtoBoard.combinations[i];
			matches = _.intersect(found_matches, combination);
			if(matches.length == 3) return true;
		}
		return false;
	},

	blockHumanWin: function(){
		found_matches = _.select(_.keys(ProtoBoard.moves), function(item){
			return ProtoBoard.moves[item] === ProtoBoard.human;
		});

		for(i = 0; i < ProtoBoard.combinations.length; i++){
			combination = ProtoBoard.combinations[i];
			matches = _.intersect(found_matches, combination);
			if(matches.length == 2){
				cell = _.reject(combination, function(cell){ return _.include(matches, cell) });
				if(ProtoBoard.moves[cell] == undefined){
					ProtoBoard.moves[cell] = ProtoBoard.computer
					$('#'+ cell).text(ProtoBoard.computer);
					return true;
				}
			}
		}
		return false;
	},

	tryComputerWin: function(){
		found_matches = _.select(_.keys(ProtoBoard.moves), function(item){
			return ProtoBoard.moves[item] === ProtoBoard.computer;
		});

		for(i = 0; i < ProtoBoard.combinations.length; i++){
			combination = ProtoBoard.combinations[i];
			matches = _.intersect(found_matches, combination);
			if(matches.length == 2){
				cells = _.reject(combination, function(cell){ return _.include(matches, cell) });
				if(ProtoBoard.moves[cells[0]] == undefined){
					ProtoBoard.moves[cells[0]] = ProtoBoard.computer
					$('#'+ cells[0]).text(ProtoBoard.computer);
					return true;
				}
			}
		}
		return false;
	},

	computerRandomMove: function(){
		cell_filled = 0;
		_.each(ProtoBoard.combinations, function(cells){
			_.each(cells, function(cell){
				if(ProtoBoard.moves[cell] == undefined && cell_filled == 0){
					cell_filled = 1;
					ProtoBoard.moves[cell]= ProtoBoard.computer;
					$('#'+cell).text(ProtoBoard.computer);
				}
			});
		});
	},

	gameEnded: function(winner){
		switch(winner){
			case 0:
				ProtoBoard.ties += 1;
				message = 'Tie';
				break;
			case ProtoBoard.computer: 
				ProtoBoard.computer_wins += 1;
				message = 'Computer wins';
				break;
			case ProtoBoard.human:
				ProtoBoard.human_wins += 1;
				message = 'Human wins';
				break;
		}
		$('#notice').text(message);
		$('#notice').show().delay(3000).fadeOut();
		$('#gameboard .cell').die();
		ProtoBoard.bindScores();
		
	},

	bindScores: function(){
		$('#computer_wins').text(ProtoBoard.computer_wins);
		$('#human_wins').text(ProtoBoard.human_wins);
		$('#ties').text(ProtoBoard.ties);


	}

};

$(ProtoBoard.init());