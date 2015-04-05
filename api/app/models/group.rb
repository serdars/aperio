class Group < ActiveRecord::Base
  belongs_to :organization
  has_many :memberships, as: :joinable
  has_many :users, through: :memberships, source: :user
  has_many :conversations

  after_create :log_create

  def is_member(user = User.current_user)
    self.users.include?(user)
  end

  def log_create
    Action.log(User.current_user, Action::Type::GROUP_CREATE, self, self.organization)
  end
end
