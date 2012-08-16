describe("Board", function(){

	beforeEach(function(){
		Board.resetGame();
	});

	it("should block human win when computer as not played", function(){
		// X|X|O
		//  | | 
		//  | |
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['0_1'] = Board.HUMAN;

		Board.blockHumanWin();

		expect(Board.moves['0_2']).toEqual(Board.COMPUTER); 
	});

	it('should go for computer win when safe', function(){
		// X| |
		// O|O|
		// X| |
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['2_0'] = Board.HUMAN;
		Board.moves['1_0'] = Board.COMPUTER;
		Board.moves['1_1'] = Board.COMPUTER;

		Board.computerMove();

		console.log(Board.moves);


		expect(Board.moves['1_2']).toEqual(Board.COMPUTER);
	});


	it('should block human win', function(){
		// X|O|
		//  |O|
		// X|X|
		Board.moves['0_0'] = Board.HUMAN;
		Board.moves['0_1'] = Board.COMPUTER;

		Board.moves['1_1'] = Board.COMPUTER;
		
		Board.moves['2_0'] = Board.HUMAN;
		Board.moves['2_1'] = Board.HUMAN;

		Board.computerMove();

		expect(Board.moves['2_2']).toEqual(Board.COMPUTER);
	});


});