class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text        :body
      t.belongs_to  :conversation
      t.belongs_to  :user

      t.timestamps null: false
    end
  end
end
