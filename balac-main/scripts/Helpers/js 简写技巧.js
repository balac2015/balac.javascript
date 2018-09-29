// for -> for...of
for (let i = 0; i < all.length; i++) => for (let i of all)

// 十进制 -> e
for (let i = 0; i < 10000000; i++) => form (let i = 0; i < 1e7; i++)

// 多行字符串：\n \t ``

// 数字转换
parseInt('1.1') => +'1.1'

// 位操作符
Math.floor(4.9) === 4 => ~~4.9 === 4	// true, 替代 Math.floor

// Array.find
const pets = [
    { type: 'Dog', name: 'Max'},
    { type: 'Cat', name: 'Karl'},
    { type: 'Dog', name: 'Tommy'},
]
function findDog(name) {
    for(let i = 0; ii) {
	    if(pets[i].type === 'Dog' && pets[i].name === name) {
	    	return pets[i];
	    }
	}
}
// 简写
pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Tommy')
console.log(pet); // { type: 'Dog', name: 'Tommy' }

