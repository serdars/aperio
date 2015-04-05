class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.belongs_to  :user, index: true
      t.belongs_to  :group, index: true
      t.belongs_to  :organization, index: true
      t.string      :title

      t.timestamps null: false
    end
  end
end
