class Storage {
    static store(key, item){
        let items = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items))
    }

    static removeAll(key){
        localStorage.removeItem(key)
    }

    static removeItem(key, id){
        let datas = localStorage.getItem(key).length > 0 ? JSON.parse(localStorage.getItem(key)) : [];
        let filteredData = datas.filter(item => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filteredData));
    }
    
    static getAll(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default Storage;