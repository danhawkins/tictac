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
	
	scores: {
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
			return false

	humanMove: (cell) ->
		@moves[cell] = Board.HUMAN
		$('#' + cell).text(Board.HUMAN);
		if this.checkForTie()
			this.gameEnded(0)
		else
			result = this.computerMove()
			this.gameEnded(result) if result != 1

	resetGame: ->
		@moves = {}
		$('#gameboard .cell').text('')
		$('#reset_game').hide()
		this.bindCells()

	computerMove: ->
		pre_state = this.checkGameState()
		if pre_state == 1
			if !this.tryComputerWin() && !this.blockHumanWin()
				this.computerRandomMove()
			return this.checkGameState()
		
		pre_state


	checkGameState: ->
		return 0 if this.checkForTie()
		return this.HUMAN if this.checkForWin(this.HUMAN);
		return this.COMPUTER if this.checkForWin(this.COMPUTER);
		return 1

	checkForTie: ->
		return true if _.keys(@moves).length == 9
		false


	checkForWin: (xo) ->
		found = this.findMatchesFor(xo)

		for combination in this.COMBINATIONS
			matches = _.intersect(found, combination)
			return true if matches.length == 3

		return false
		
	blockHumanWin: ->
		found = this.findMatchesFor(this.HUMAN)

		for combination in this.COMBINATIONS
			matches = _.intersect(found, combination)
			if matches.length == 2
				cell = _.reject(combination, (cell) =>
					_.include(matches, cell)
				)
				if typeof(@moves[cell]) == 'undefined'
					@moves[cell] = this.COMPUTER
					$('#'+cell).text(this.COMPUTER)
					return true
		false

	tryComputerWin: ->
		found = this.findMatchesFor(this.COMPUTER)

		for combination in this.COMBINATIONS
			matches = _.intersect(found, combination)
			if matches.length == 2
				cells = _.reject(combination, (cell) =>
					_.include(matches, cell)
				)
				if typeof(@moves[cells[0]]) == 'undefined'
					@moves[cells[0]] = this.COMPUTER
					$('#'+cells[0]).text(this.COMPUTER)
					return true
		false

	computerRandomMove: ->
		cell_filled = false
		_.each(this.COMBINATIONS, (cells) =>
			_.each(cells, (cell) => 
				if typeof(@moves[cell]) == 'undefined' && !cell_filled
					cell_filled = true
					@moves[cell] = this.COMPUTER
					$('#'+cell).text(this.COMPUTER)
			)
		)

	gameEnded: (winner)->
		switch winner
			when 0
				this.scores.ties += 1
				message = "It's a Tie!"
			when this.COMPUTER
				this.scores.computer += 1
				message = "Opps, you lost that one!"
			when this.HUMAN
				this.scores.human += 1
				message = "Yay, you won!"

		$('#notice').text(message);
		$('#notice').show().delay(3000).fadeOut()
		$('#gameboard cell').die()
		$('#reset_game').show()
		this.bindScores()

	bindScores: ->
		$('#computer_wins').text(this.scores.computer)
		$('#human_wins').text(this.scores.human)
		$('#ties').text(this.scores.ties)

	findMatchesFor: (kind) ->
		_.select(_.keys(@moves), (item) =>
			return @moves[item] == kind
		)
}

Board.init()