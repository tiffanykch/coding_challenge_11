// TASK 1: CREATING A BOOK CLASS - LIBRARY MANAGEMENT SYSTEM

// Creating Book class containing book details
class Book {
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = copies;
    }

    // Method to return book details
    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`
    }

    // Method to modify available copies when book is borrowed or returned
    updateCopies(quantity) {
        this.copies += quantity;
        return this.getDetails()
    }
}

// Test Cases
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());

book1.updateCopies(-1);
console.log(book1.getDetails());