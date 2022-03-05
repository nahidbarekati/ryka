const Transform = require('../Transform');

const moment = require('jalali-moment');
moment().locale('fa').format('YYYY/M/D');

module.exports = class TaskTransform extends Transform {


    transform(item){

        return {
            'id' : item._id ,
            'title' : item.title,
            'description' : item.description,
            "status": item.status,
            ...this.showAuthor(item),
        }
            
    }
    showAuthor(item) {
        const UserTransform = require('./AuthorTransform');
        if(this.withAuthorTask ) {
            return {
                'author' : new UserTransform().transform(item.user)
            }
        }
        return {}
    }
    withAuthor() {
        this.withAuthorTask = true;
        return this;
    }


}