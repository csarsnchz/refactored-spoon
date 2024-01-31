# Project Name
CERP PROJECT

## Description

A brief description of your project.

## Installation

1. Clone the repository:

    git clone https://github.com/csarsnchz/refactored-spoon/tree/main/cerp-api

2. Install the dependencies:

    npm install

3. Set up the database:

    - Make sure you have SQLite installed on your machine.
    - Create a new SQLite database file (e.g., `database.db`).

4. Configure the database connection:

    - Open the `.env` file and update the `DATABASE_URL` variable with the path to your SQLite database file.

5. Run the migrations:

    npx prisma migrate dev

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
