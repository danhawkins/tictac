class Board
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
	init: ->
