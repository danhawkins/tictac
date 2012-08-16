class GamesController < ApplicationController
	
	respond_to :html, :json

	before_filter :get_game

	def show
		respond_with @game
	end

	def update
		scores = params.select{|k,v| %W{computer human ties}.include?(k) }
		@game.update_attributes(scores)

		render json: {status: 'OK'}
	end

	protected
		def get_game
			@game = Game.find_or_create_by_ip(request.env['REMOTE_ADDR'])
		end
end