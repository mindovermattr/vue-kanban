class TasksChannel < ApplicationCable::Channel
  def subscribed
    stream_from "tasks_channel_#{params[:desk_id]}" if params[:desk_id].present?
  end
end
