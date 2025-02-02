# FAQ Project

This project is an FAQ (Frequently Asked Questions) system built using React, Node.js, and MongoDB. It provides users with a platform to view, search, and manage FAQs related to a specific topic.

# Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB


# Setup Instructions
- Clone the repository:

``` bash
git clone <repository-url>
```

- Install backend dependencies:

``` bash
cd backend
npm install
```

- Install frontend dependencies:

```bash
cd frontend
npm install
```

- Start the server:

Run the backend server:
```bash
cd backend
npm start
```

Run the frontend app:
```bash
cd frontend
npm start
```

                                            OR

- Run Docker commands:

```bash
docker-compose build
docker-compose up
```

- Visit: Open your browser and go to http://localhost:3000 to view the app.


## Routes Explained:

- localhost:5000/api/faqs : Shows all the FAQs in the database.
- localhost:5000/api/faqs?lang=hi or localhost:5000/api/faqs?lang=bn : Shows all the FAQs in provided language in the database.

To test above routes:
- Go to postman:

1. POST: Create a New FAQ
- Method: POST
- URL: http://localhost:5000/api/faqs

2. GET: Get All FAQs
- Method: GET
- URL: http://localhost:5000/api/faqs


### Additional Work:

- Go to localhost:3000/ to add FAQ in the database using form.
- Go to localhost:3000/all to see all the FAQs in the database.

## 📥 API Endpoints

➕ Add New FAQ

- POST /api/faq

```bash 

Request Body:

{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime."
}
```
```bash
Response:

{
  "message": "FAQ added successfully",
  "faq": {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime.",
    "question_hi": "Node.js क्या है?",
    "answer_hi": "Node.js एक जावास्क्रिप्ट रनटाइम है।",
    "question_bn": "Node.js কি?",
    "answer_bn": "Node.js একটি জাভাস্ক্রিপ্ট রানটাইম।"
  }
}
```

📋 Get All FAQs

- GET /api/faq/all

```bash
Response:

{
  "faqs": [
    {
      "question": "What is Node.js?",
      "answer": "Node.js is a JavaScript runtime."
    }
  ]
}
```

🌐 Get FAQs in a Specific Language

- GET /api/faq?lang=hi

- Query Parameter: lang (supported: hi, bn)
```bash
Response:
{
  "faqs": [
    {
      "question": "What is Node.js?",
      "answer": "Node.js is a JavaScript runtime.",
      "question_hi": "Node.js क्या है?",
      "answer_hi": "Node.js एक जावास्क्रिप्ट रनटाइम है।"
    }
  ]
}
```

## Contributing

1. Fork the repository.

2. Create your feature branch (git checkout -b feature-branch).

3. Commit your changes (git commit -m 'Add new feature').

4. Push to the branch (git push origin feature-branch).

5. Open a pull request.

.👤 Authour: Ayush Gupta(https://www.linkedin.com/in/the-ayush-gupta/)
