class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.string :motto
      t.boolean :private

      t.belongs_to :organization, index: true

      t.timestamps null: false
    end
  end
end
