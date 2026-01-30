const { Mongoose, default: mongoose } = require('mongoose');

async function connectdb() {
  try {
    const connet = await mongoose.connect(`${process.env.MONGODB_CONNECT_URL}/${process.env.DB_NAME}`);
    connet.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    connet.connection.on('error', (err) => {
      console.log('Mongoose connection error:', err);
      process.emit();
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

export default connectdb;
