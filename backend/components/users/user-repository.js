import DBLocal from 'db-local';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

const {Schema} = new DBLocal({path: './db'});

const User = Schema('User', {
    _id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String,required: true}
});

export class UserRepository {

    static async create({username, password}) {
        // username validations
        Validation.username(username);
        Validation.password(password);

        console.log("Cual user viene? ", username);
        // validate if username already exists
        const user = User.findOne({username});
        console.log("Ya existe ese user? ", user);
        
        if(user) throw new Error('Username already exist');

        const id = crypto.randomUUID();
        const hashPassword = await bcrypt.hash(password, 10);

        User.create({
            _id: id,
            username,
            password: hashPassword
        }).save();

        return id;
    }

    static async login({username, password}) {
        Validation.password(password);

        const user = User.findOne({username});
        if(!user) throw new Error('Username does not exist');

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) throw new Error('Password is invalid');

        const {password: _, ...publicUser} = user;

        return publicUser;
    }
}

class Validation {
    static username(username) {
        if(typeof username !== 'string') throw new Error('Username must be a string');
        if(username.length < 3) throw new Error('Username must be at least 3 characteres long');
    }

    static password(password) {
        if(typeof password !== 'string') throw new Error('Password must be a string');
        if(password.length < 6) throw new Error('Password must be at least 3 characteres long');

        
    }
}