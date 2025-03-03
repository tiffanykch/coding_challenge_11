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
    }
}

// Test Cases
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());

book1.updateCopies(-1);
console.log(book1.getDetails());

// TASK 2: CREATING A BORROWER CLASS

// Create Borrower class to track members that check out books
class Borrower {
    constructor(name, borrowerId) {
        this.name = name;
        this.borrowerId = borrowerId;
        this.borrowedBooks = [];
    }

    // Method that adds books title to array of borrowed books
    borrowBook(book) {
        this.borrowedBooks.push(book)
    }

    // Method to removes books from array of borrowed books
    returnBook(book) {

        // Identifies book index in array
        const bookIndex = this.borrowedBooks.indexOf(book);

        // Checks if book exists
        if (bookIndex > -1) {

            //Used splice to allow any borrowed book to be removed, not only the first/last one
            this.borrowedBooks.splice(bookIndex, 1)
        }

    }
}

// Test Case
const borrower1 = new Borrower("Alice Johnson", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

borrower1.returnBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

// TASK 3: CREATING A LIBRARY CLASS

// Creating Library class containing book and borrower details
class Library {
    constructor() {
        this.books = [];
        this.borrowers = [];
    }

    // Method to add new book to the library
    addBook(book) {

        // Check if book already instantiated by Book class
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            console.log(`Please provide valid book instance.`)
        }
    }

    // Method to log all books' details
    listBooks() {
        this.books.forEach(borrower => console.log(borrower.getDetails()))
    }

    // TASK 4: IMPLEMENTING BOOK BORROWING
    // Method to add borrowers to array
    addBorrower(borrower) {

        // Check if book already instantiated by Book class
        if (borrower instanceof Borrower) {
            this.borrowers.push(borrower);
        } else {
            console.log(`Please provide valid book instance.`)
        }
    }
    
    // Method to allow members to borrow books if they are available
    lendBook(borrowerId, isbn) {

        // Identify book in array using isbn
        let bookIndex = this.books.findIndex(book => book.isbn === isbn);

        // Identify borrower in array using borrower ID
        let borrowerIndex = this.borrowers.findIndex(borrower => borrower.borrowerId === borrowerId);
        let borrower = this.borrowers[borrowerIndex];
              
        // Check if book exists and has available copies
        if (bookIndex !== -1 && this.books[bookIndex].copies > 0) {

            // Reduces book copies by 1
            this.books[bookIndex].copies -= 1;

            // Updates borrower's borrowedBooks list
            if (borrowerIndex !== -1) {
                borrower.borrowBook(this.books[bookIndex].title);
            }

        } else {
            return `Book not available.`;
        }
    }

    // TASK 5: IMPLEMENTING BOOK RETURNS
    // Method to record returned books and update book availability
    returnBook(borrowerId, isbn) {
        
        // Identify book in array using isbn
        let bookIndex = this.books.findIndex(book => book.isbn === isbn);

        // Identify borrower in array using borrower ID
        let borrowerIndex = this.borrowers.findIndex(borrower => borrower.borrowerId === borrowerId);
        let borrower = this.borrowers[borrowerIndex];
              
        // Check if book exists
        if (bookIndex !== -1) {

            // Increases book copies by 1
            this.books[bookIndex].copies += 1;

            // Updates borrower's borrowedBooks list
            if (borrowerIndex !== -1) {
                borrower.returnBook(this.books[bookIndex].title);
            }

        } else {
            return `Book returned unsuccessfully.`;
        }
    }
}

// Test Case for Task 3
const library = new Library();
library.addBook(book1);
library.listBooks();

// Test Case for Task 4
library.addBorrower(borrower1);
library.lendBook(201, 123456);
console.log(book1.getDetails());
console.log(borrower1.borrowedBooks);

// Test Case for Task 5
library.returnBook(201, 123456);
console.log(book1.getDetails());
console.log(borrower1.borrowedBooks);