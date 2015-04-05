class Conversation < ActiveRecord::Base
  belongs_to  :user
  belongs_to  :group
  belongs_to  :organization
  has_many    :messages
end
