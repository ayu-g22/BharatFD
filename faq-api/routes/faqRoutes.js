const express = require('express');
const FAQ = require('../models/FAQ');
const router = express.Router();

// Get all FAQs
router.get('/faqs', async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new FAQ
router.post('/faqs', async (req, res) => {
    const faq = new FAQ({
        question: req.body.question,
        answer: req.body.answer,
    });

    try {
        const newFaq = await faq.save();
        res.status(201).json(newFaq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single FAQ by ID
router.get('/faqs/:id', async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json(faq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an FAQ
router.delete('/faqs/:id', async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });

        await faq.remove();
        res.json({ message: 'FAQ deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
