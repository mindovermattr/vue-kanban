import ActionCable from 'actioncable'

export const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
