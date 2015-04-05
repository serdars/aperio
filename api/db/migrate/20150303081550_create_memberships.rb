class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.belongs_to :user
      t.integer    :joinable_id
      t.string     :joinable_type

      t.timestamps null: false
    end
  end
end
