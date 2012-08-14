class Board
	COMBINATIONS:
		[
			#horizontal win lines
			['1_1','1_2','1_3'],
			['2_1','2_2','2_3'],
			['3_1','3_2','3_3'],
			#vertical win lines
			['1_1','2_1','3_1'],
			['1_2','2_2','3_2'],
			['1_3','2_3','3_3'],
			#diagonal win lines
			['1_1','2_2','3_3'],
			['1_3','2_2','3_1']
		]
	init: ->
		