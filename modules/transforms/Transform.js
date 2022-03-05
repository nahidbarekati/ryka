const User = require(`${path.model}/User`);

module.exports = class Transform {

    transformCollection(items) {
        if(this.withPaginateStatusV1) {
            return items.docs.map(this.transform.bind(this));
        }else if(this.withPaginateStatus){
            return {
                [this.CollectionName()] : items.docs.map(this.transform.bind(this)),
                ...this.paginateItem(items)
            }
        }
        return items.map(this.transform.bind(this))
    }

    paginateItem(items) {
        return {
            total : items.total,
            limit : items.limit,
            page : items.page,
            pages : items.pages
        }
    }

    CollectionName(CollectName = 'items') {
        return CollectName;
    }

    withPaginateV1() {
        this.withPaginateStatusV1 = true;
        return this;
    }

    withPaginate() {
        this.withPaginateStatus = true;
        return this;
    }
    withToken(item) {
        if (item.token)
            return {token: item.token}

        if (this.createToken) {

            let token = this.model.User

            return {token}
        }

        return {};
    }

}