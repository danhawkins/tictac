describe("Board", function(){

	it("should block human win when computer as not played", function(){
		// X|X|O
		//  | | 
		//  | |
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['0_1'] = Board.HUMAN;

		Board.blockHumanWin();

		expect(Board.moves['0_2']).toEqual(Board.COMPUTER); 
	});

	it("should try computer win", function(){
		//  | |
		// O|O|O
		//  | |
		Board.moves['1_0'] = Board.COMPUTER
		Board.moves['1_1'] = Board.COMPUTER

		Board.tryComputerWin();

		expect(Board.moves['1_2']).toEqual(Board.COMPUTER);
	});

	it('should try computer win if can win', function(){
		// X|X|
		// O|O|
		//  | |
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['0_1'] = Board.HUMAN;
		Board.moves['1_0'] = Board.COMPUTER;
		Board.moves['1_1'] = Board.COMPUTER;

		Board.computerMove();

		expect(Board.moves['1_2']).toEqual(Board.COMPUTER);
	});


	it('should block human win when computer has played', function(){
		// X|X|
		// O| |
		//  |O|
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['0_1'] = Board.HUMAN;
		Board.moves['1_0'] = Board.COMPUTER;
		Board.moves['2_1'] = Board.COMPUTER;

		Board.computerMove();

		expect(Board.moves['0_2']).toEqual(Board.COMPUTER);
	});

});