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
		this.bindCells()
		this.bindControls()

	bindCells: ->
		$('#gameboard .cell').live 'click', (event) =>
			$('#reset_game').show if $('#reset_game').is(':hidden')
			this.humanMove(event.target.id)

	bindControls: ->
		$('#reset_game').live 'click', (event) =>
			this.resetGame()
			false

	humanMove: (cell) ->
		@moves[cell] = Board.HUMAN
		$('#' + cell).text(Board.HUMAN);
		if this.checkForTie()
			this.gameEnded(0)
		else
			result = this.computerMove()
			this.gameEnded(result) if result != 1

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



