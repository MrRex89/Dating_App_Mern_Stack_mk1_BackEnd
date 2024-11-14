/*
-- Chat GPT is claiming this is the 'model' of MVC
*/
import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    id: String,
    name: String,
    url: String, 
});

// Pre-save middleware to log data before saving
cardSchema.pre('save', function(next) {
    console.log('Saving card data:', this);  // 'this' refers to the document being saved
    next();  // Proceed to save
});

// Post-find middleware to log data after querying
cardSchema.post('find', function(docs) {
    console.log('Fetched cards from database:', docs);  // 'docs' is an array of documents
});

export default mongoose.model('Card', cardSchema);