var db = `js292`
var objStore = `mobile`
var objStores = ['mobile', 'tivi', 'food','store'];
var dbPromise
Tao_Co_so_Du_lieu_indexedDB = () => {
    dbPromise = idb.open(db, 1, upgradeDB => {
        // if (!upgradeDB.objectStoreNames.contains(objStore)) {
        //     upgradeDB.createObjectStore(objStore);
        // }
        objStores.forEach(item => {
            if (!upgradeDB.objectStoreNames.contains(item)) {
                upgradeDB.createObjectStore(item);
            }
        })

    });
}

Xoa_Co_so_Du_lieu_indexedDB=()=>{
    dbPromise = idb.delete(db);
}


Tao_Du_lieu_indexedDB=(Du_lieu)=> {
    Du_lieu.forEach(item => {
        idbDienthoai.set(item.Ma_so, item)
    })
}




const idbObjStore = {
    get(key,objStoreName) {
        return dbPromise.then(db => {
            return db.transaction(objStoreName)
                .objectStore(objStoreName).get(key);
        });
    },
    set(key,val,objStoreName) {
        return dbPromise.then(db => {
            const tx = db.transaction(objStoreName, 'readwrite');
            tx.objectStore(objStoreName).put(val, key);
            return tx.complete;
        });
    },
    delete(key,objStoreName) {
        return dbPromise.then(db => {
            const tx = db.transaction(objStoreName, 'readwrite');
            tx.objectStore(objStoreName).delete(key);
            return tx.complete;
        });
    },
    clear(objStoreName) {
        return dbPromise.then(db => {
            const tx = db.transaction(objStoreName, 'readwrite');
            tx.objectStore(objStoreName).clear();
            return tx.complete;
        });
    },
    keys(objStoreName) {
        return dbPromise.then(db => {
            const tx = db.transaction(objStoreName);
            const keys = [];
            const store = tx.objectStore(objStoreName);
            // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
            // openKeyCursor isn't supported by Safari, so we fall back
            (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
                if (!cursor) return;
                keys.push(cursor.key);
                cursor.continue();
            });

            return tx.complete.then(() => keys);
        });
    },
    getAll(objStoreName) {
        return dbPromise.then(db => {
            var tx = db.transaction(objStoreName, 'readonly');
            var store = tx.objectStore(objStoreName);
            return store.getAll();
        });
    }

};



