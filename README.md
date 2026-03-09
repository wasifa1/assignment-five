**1️⃣ What is the difference between var, let, and const?**
**Ans:** 
var : hoisted, can be accessed using console.log before declaration but returns 'undefined'.Function scoped.
let : introduced in ES6, cannot be accessed before declaration and value can be reassigned. Block scoped.
const : introduced in ES6, cannot be accessed before declaration and value cannot be reassigned. Block scoped.

**2️⃣ What is the spread operator (...)?
Ans:**
Used to expand the elements of an array individually without [].
example: 
const nums = [1, 2, 3];
console.log(...nums);//output = 1 2 3

**3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:**
map() : maps each element of array to perform a function and returns as an array.
  example : 
    numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num*2);
    console.log(doubled);//output = [ 2, 4, 6, 8, 10 ]
filter() : returns all elements fulfilling the condition as an array
  example: 
    numbers = [1, 2, 3, 4, 5];
  const evens = numbers.filter(num => num%2 ===0)
  console.log(evens); // output = [ 2, 4 ]
forEach() : Executes a function on each element of an array but does not return an array.
  example:
    numbers = [1,2,3];
    numbers.forEach(num => console.log(num)); 
    // output : 1
                2
                3
    
**4️⃣ What is an arrow function?
Ans:** Arrow functions are a shorter way to define a function.
Format: 
  Single Line: (doesn't need 'return' keyword)
    const name = (parameters) => expression_to_return;
    example:
      const add = (num1,num2) => num1 + num2;

  Multiple Lines: (needs 'return' keyword)
    const name = (parameters) => {
      expression;
      return expression;
    };
  example:
    const doMath = (x,y) =>{
      const sum = x+y;
      const diff = x-y;
      const result = sum * diff;
      return result;
    }

**5️⃣ What are template literals?
Ans:**
Single or multi line strings written using backticks (``).Variables can be inserted using ${}.These are template literals.
