class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :joinable, polymorphic: true

  after_create :log_create

  def log_create
    if (self.joinable.is_a? Group)
      Action.log(self.user, Action::Type::GROUP_JOIN, self.joinable, self.joinable.organization)
    else
      Action.log(self.user, Action::Type::ORGANIZATION_JOIN, self.joinable)
    end
  end
end
