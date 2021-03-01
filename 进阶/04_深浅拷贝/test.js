

let obj = {
  name: '起飞',
  age: 18,
  info: function () {
    console.log(this.name + ' ' + this.age);
  }
}


// function deepClone(source) {
//   if (!source || (typeof source !== 'object')) return source
//   let target = Array.isArray(source) ? [] : {}
//   for (const key in source) {
//     if (source.hasOwnProperty(key)) {
//       if (source[key] && typeof source[key] === 'object') {
//         target[key] = deepClone(source[key])
//       }
//       else {
//         target[key] = source[key]
//       }
//     }
//   }
//   return target
// }

function deepClone(source) {
  if (!source || (typeof source !== 'object')) return source
  let target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof key === 'object') {
        target[key] = deepClone(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

let obj2 = deepClone(obj)

obj.name = 'Gene'
console.log(obj);
console.log(obj2);

// let obj3 = Object.assign({ aihao: 123 }, obj2)
// console.log(obj3);
// obj3.info()

// let obj3 = JSON.parse(JSON.stringify(obj))
// obj.name = 'Rainbow'
// console.log(obj);
// console.log(obj3);