const mysql = require('mysql')

const userSchema = mysql.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

class User {
    constructor(name) {
        this._name = name;
        this._loggedIn = false;
        this._lastLoggedInAt = null;
    }
    isLoggedIn() {
        return this._loggedIn;
    }
    getLastLoggedInAt() {
        return this._lastLoggedInAt;
    }
    logIn() {
        this._lastLoggedInAt = new Date();
        this._loggedIn = true;
    }
    logOut() {
        this._loggedIn = false
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    canEdit(comment) {
        if (comment._author._name === this._name) {
            return true;
        }
        return false;
    }
    canDelete(comment) {
        return false;
    }
}
// const user1 = new user('username')
class Moderator extends User {
    constructor(name) {
        super(name);
    }
    canDelete(comment) {
        return true;
    }
}
//
class Admin extends Moderator {
    constructor(name) {
        super(name)
    }
    canEdit(comment) {
        return true;
    }
}

class Comment {
    constructor(author = null, message, repliedTo = null) {
        this._createdAt = new Date();
        this._message = message;
        this._repliedTo = repliedTo;
        this._author = author;
    }
    getMessage() {
        return this._message;
    }
    setMessage(message) {
        this._message = message;
    }
    getCreatedAt() {
        return this._createdAt;
    }
    getAuthor() {
        return this._author;
    }
    getRepliedTo() {
        return this._repliedTo;
    }
    toString() {
        if (this._repliedTo === null) {
            return this._message + " by " + this._author._name
        }
        return this._message + " by " + this._author._name + " (replied to " + this._repliedTo._author._name + ")"
    }
}