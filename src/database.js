import mongoose from 'mongoose'

class Database{

    constructor(){
        this.init()
    }

    init(){
        mongoose.connect('mongodb://localhost:27017/userdb',
        {useNewUrlParser: true , useUnifiedTopology: true},
        console.log('MongoDB connected')
        );
    } 

}

export default new Database()
