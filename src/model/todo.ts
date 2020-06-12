import * as mongoose from 'mongoose';
import { XSchema } from "./index"

export interface ITodo extends mongoose.Document {
  task: string;
  created_at: Date;
  description: { type: String , required: true},
  done: { type: Boolean, required: false, default: false },
}

const schema = new XSchema({
  task: { type: String , required: true},
  description: { type: String , required: true},
  created_at: { type: Date, required: false, default: new Date() },
  done: { type: Boolean, required: false, default: false },
});

schema.set('toJSON', { virtuals: true });

export default mongoose.model<ITodo>('Todo', schema, 'todo');
