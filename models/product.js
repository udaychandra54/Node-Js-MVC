const fs = require('fs');
const path = require('path');

const getProductsFromfile=(cb)=>{
  const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }


  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    getProductsFromfile((products)=>{
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    })
  
  }

  static fetchAll(cb) {
    getProductsFromfile(cb)
  }
};
