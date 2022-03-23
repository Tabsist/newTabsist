let DB;
const sessionDb = {

    init : () => {
        if (!indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }
        const request = indexedDB.open("Sessions", 1);
        request.onupgradeneeded = event => {
            
            const db = event.target.result;
            const objectStore = db.createObjectStore("sessions", { keyPath: "uid" });
          };
          console.log('connecting')

          return new Promise(resolve => {
            request.onsuccess = e => {
              DB = e.target.result;
              console.log("heydkdk",request.result,e,DB)
              resolve(e.target.result);
            };
            request.onerror = e => {
              console.log("error connecting indexDb",e);

            };
          });
        },
    add : (session) => {
        const db = DB;
        console.log(db,DB,"qwe123")
        const store = db.transaction("sessions", "readwrite").objectStore("sessions");
        const request = store.put(session);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
              console.log("done")
              resolve(request.result);
            };
            request.onerror = e => {
              console.log("error while add/update ", e.target);
              reject(e.target);
            };
          });
        },
        
    delete : (uid = null) => {

        if (uid)   {
            const db = DB;
            const transaction = db.transaction("sessions", "readwrite")
            const store = transaction.objectStore("sessions");
            const request = store.delete(uid);
            console.log("sddfjn")
            return new Promise((resolve, reject) => {
                transaction.oncomplete = () => {
                  console.log("rwrw")
                  resolve();
                };
                request.onerror = e => {
                  console.log("dvdv")
                  reject(e.target);

                };
              });
        }
        else {
            const db = DB;
            const store = db.transaction("sessions", "readwrite").objectStore("sessions");
            const request = store.clear();;
            
            // DB.close();

            // const request = browser.indexedDB.deleteDatabase("sessions");

            return new Promise(resolve => {
              request.onsuccess = () => {
                resolve();
              };
              request.onerror = e => {
                reject(e);
              };
            });

        }    
    },
    get : (uid = null) => {
        const db = DB;
        let request;
        const store = db.transaction("sessions", "readonly").objectStore("sessions");
        if (uid) {
            request = store.get(uid)
        }
        else {
            request = store.getAll(uid)
        }
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
              if (request.result) {
                resolve(request.result);
              } else reject(request);
            };
            request.onerror = e => {
              reject(request);
            };
          });
    }
    }
    export default sessionDb

