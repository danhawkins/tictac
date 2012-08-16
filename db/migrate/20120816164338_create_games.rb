class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :ip
      t.integer :computer, default: 0, null: false
      t.integer :human, default: 0, null: false
      t.integer :ties, default: 0, null: false

      t.timestamps
    end
  end
end
