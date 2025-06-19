function Student (name,roll_no){
    this.name = name;
    this.roll_no = roll_no;
}

Student.prototype.greet = function(){
    console.log(`Hello! Mr. ${this.name}`)
}

const s1 = new Student("Nikhil","64")
s1.greet()  