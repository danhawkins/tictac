class Game < ActiveRecord::Base
  attr_accessible :computer, :human, :ip, :ties
end
