class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer     :inviter_id
      t.integer     :invitee_id
      t.references  :organization
      t.integer     :state

      t.timestamps null: false
    end
  end
end
