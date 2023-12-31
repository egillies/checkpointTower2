import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent.js';
import { TicketsSchema } from '../models/Ticket.js';
import { CommentsSchema } from '../models/Comment.js';



class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);
  Comments = mongoose.model('Comment', CommentsSchema);
  Tickets = mongoose.model('Ticket', TicketsSchema);
}

export const dbContext = new DbContext()
