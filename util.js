
//global påverkan
  Storage.prototype.getNumber = function (key) {
    // 'this' är det våran localStorage eller sessionStorage
    return parseInt(this.getItem(key));
  };

  export function delay(ms){
    const promise = new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve();
        }, ms);
    });
    return promise;
}

//gör om något till en promise så man kan använda await

  //TODO lägga till stachStorage för testerna
