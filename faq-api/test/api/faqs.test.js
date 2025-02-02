const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server'); 
const FAQ = require('../../models/FAQ');
require('dotenv').config();

describe('FAQ API Routes', function () {
    // Connect to an in-memory MongoDB instance before running tests
    before(async function () {
        const uri = process.env.MONGO_URI; // Adjust if needed
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Clear database before each test
    beforeEach(async function () {
        await FAQ.deleteMany({});
    });

    // Disconnect after all tests
    after(async function () {
        await mongoose.disconnect();
    });

    it('should fetch all FAQs', async function () {
        const faq1 = new FAQ({ question: 'What is Node.js?', answer: 'A JavaScript runtime.' });
        const faq2 = new FAQ({ question: 'What is MongoDB?', answer: 'A NoSQL database.' });

        await faq1.save();
        await faq2.save();

        const response = await request(app).get('/api/faqs');

        // Check that the status code is 200 and verify the FAQs returned
        chai.assert.equal(response.status, 200);
        chai.assert.isArray(response.body);
        chai.assert.equal(response.body.length, 2);
        chai.assert.equal(response.body[0].question, 'What is Node.js?');
    });

    it('should create a new FAQ', async function () {
        const response = await request(app)
            .post('/api/faqs')
            .send({ question: 'What is Express?', answer: 'A web framework for Node.js.' })
            .expect(201);

        chai.assert.equal(response.body.question, 'What is Express?');
        chai.assert.equal(response.body.answer, 'A web framework for Node.js.');
    });

    it('should fetch a single FAQ by ID', async function () {
        const faq = new FAQ({ question: 'What is MongoDB?', answer: 'A NoSQL database.' });
        await faq.save();

        const response = await request(app).get(`/api/faqs/${faq._id}`);
        chai.assert.equal(response.status, 200);
        chai.assert.equal(response.body.question, 'What is MongoDB?');
    });

    it('should delete an FAQ', async function () {
        const faq = new FAQ({ question: 'What is React?', answer: 'A JavaScript library for building UI.' });
        await faq.save();

        const response = await request(app).delete(`/api/faqs/${faq._id}`);
        chai.assert.equal(response.status, 200);
        chai.assert.equal(response.body.message, 'FAQ deleted successfully');

        // Verify FAQ is deleted
        const deletedFAQ = await FAQ.findById(faq._id);
        chai.assert.isNull(deletedFAQ);
    });
});
