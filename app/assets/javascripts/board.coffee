Board = {
	COMBINATIONS:
		[
			#horizontal win lines
			['0_0','0_1','0_2'],
			['1_0','1_1','1_2'],
			['2_0','2_1','2_2'],
			#vertical win lines
			['0_0','1_0','2_0'],
			['0_1','1_1','2_1'],
			['0_2','1_2','2_2'],
			#diagonal win lines
			['0_0','1_1','2_2'],
			['0_2','1_1','2_0']
		]
	COMPUTER: 'O'
	HUMAN: 'X'

	moves: {}
	
	wins: {
		computer: 0,
		human: 0,
		ties: 0
	}

	init: -> 
		Board.bindCells()
		Board.bindControls()

	bindCells: ->
		$('#gameboard .cell').live 'click', (event) =>
			$('#reset_game').show if $('#reset_game').is(':hidden')
			Board.humanMove(event.target.id)

	bindControls: ->


	humanMove: (cell) ->
		@moves[cell] = Board.HUMAN
		$('#' + cell).text(Board.HUMAN);
		if Board.checkForTie()
			Board.gameEnded(0)
		else
			result = Board.computerMove()
			Board.gameEnded(result) if result != 1
		end

	resetGame: ->



	computerMove: ->



	checkGameState: ->



	checkForTie: ->



	checkForWin: ->



	blockHumanWin: ->



	tryComputerWin: ->



	computerRandomMove: ->



	gameEnded: ->



	bindScores: ->
}

Board.init()



