import * as mongoose from 'mongoose';

// ההסכמה של המוצר (איך רצוי שכל משתשמש יכניס מוצר)
export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});


// המודל של המוצר עליו משתשמשים בפעולות כמו find save delete
// זה אמור להיות extends mongoose.Document אבל שעתיים ניסיתי ולא מוצא
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}