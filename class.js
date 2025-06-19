class Student {
    constructor(name,age,roll_no){
        this.name = name;
        this.age = age;
        this.roll_no = roll_no;
    }   

    setName(value){
        this.name = value;
    }

    greet(){
        console.log(`Hi ${this.name}, a very good morning`)
    }

    // return or console.log directly
    printAge(){
        return`${this.name}'s age : ${this.age}`
    }

    printRollNo(){
        console.log(`${this.name}'s roll no. : ${this.roll_no}`)
    }
};

const s1 = new Student("John","42","2021UMP1064")
const s2 = new Student("Kunal","41","2021UMP1066")
s1.greet()

const ans = s1.printAge()
console.log(ans)

// s2.printRollNo()
s2.setName('Rahul')
s2.greet()

 

// Static methods and properties are called directly on the class and cannot be accessed through an instance.
class Calculator {
    // A static method
    static add(a, b) {
        return a + b;
    }

    // A non-static method (instance method)
    multiply(a, b) {
        return a * b;
    }
}

// Calling the static method directly on the class
console.log(Calculator.add(5, 10)); // Output: 15

// Creating an instance of the class
const calc = new Calculator();

// Calling the instance method
console.log(calc.multiply(5, 10)); // Output: 50

// NOTE : 
//     Trying to call a static method on an instance (this will throw an error)
