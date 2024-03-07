# Libray-Menagment

## Overview
This project is a Library Management System implemented using Node.js, Express, Prisma, and MySQL database. It includes user authentication to manage library resources efficiently.

## Features
- User Authentication: Secure user authentication system using JSON Web Token (JWT).
- Book Management: Add, edit, and delete books with details such as title, author, ISBN, image url etc.
- User Management: Admins can manage user accounts, roles, and permissions.
- Borrowing and Returning: Users can borrow and return books, and administrators can track book transactions.
  

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - Prisma

- **Database:**
  -  MySQL


## Installation
1. Clone the repository: `git clone https://github.com/yourusername/library-management.git`
2. Navigate to the project folder: `cd library-management`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file and add necessary variables.

## Env
Update the `.env` file with the following configuration:

DATABASE_URL=mysql://'username:password@localhost:3306/name of db'

SECRET_KEY = Your-secret-key

