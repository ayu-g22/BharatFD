const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const translate = require('translate-google');
const Redis = require('ioredis');

// Initialize Redis client
const redis = new Redis({
  host: 'redis',  // Default Redis host
  port: 6379,         // Default Redis port
  password: '',       
});

// Test connection to Redis
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Helper function to translate text
async function translateText(text, lang) {
  // Check Redis cache first
  const cachedTranslation = await redis.get(`${text}-${lang}`);
  if (cachedTranslation) {
    console.log('Cache hit');
    return cachedTranslation;  // Return cached translation
  }

  try {
    // Translate text using Google Translate API
    const translated = await translate(text, { to: lang });
    
    // Save translation in Redis cache
    await redis.set(`${text}-${lang}`, translated);
    console.log('Cache miss and translation saved');
    
    return translated;
  } catch (error) {
    console.error(`Error translating text: ${error}`);
    return text;  // Fallback to original text if translation fails
  }
}

// POST route to add FAQs
router.post('/faq', async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Translate the FAQ question and answer
    const question_hi = await translateText(question, 'hi');
    const answer_hi = await translateText(answer, 'hi');
    const question_bn = await translateText(question, 'bn');
    const answer_bn = await translateText(answer, 'bn');

    // Create a new FAQ entry and save to DB
    const newFAQ = new Faq({
      question,
      answer,
      question_hi,
      answer_hi,
      question_bn,
      answer_bn,
    });

    await newFAQ.save();
    res.status(201).json({ message: 'FAQ added successfully', faq: newFAQ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding FAQ' });
  }
});

// GET route to fetch FAQs with translation based on lang query param
router.get('/faq', async (req, res) => {
  const { lang } = req.query;

  if (!lang) {
    return res.status(400).json({ message: 'Language query parameter is required' });
  }

  try {
    const faqs = await Faq.find();
    const translatedFaqs = faqs.map(faq => {
      let translatedQuestion = faq.question;
      let translatedAnswer = faq.answer;

      // Apply the translations based on the requested lang
      if (lang === 'hi') {
        translatedQuestion = faq.question_hi || faq.question;
        translatedAnswer = faq.answer_hi || faq.answer;
      } else if (lang === 'bn') {
        translatedQuestion = faq.question_bn || faq.question;
        translatedAnswer = faq.answer_bn || faq.answer;
      }

      // Structure the FAQ response object to include the original and translated versions
      return {
        question: faq.question,
        answer: faq.answer,
        [`question_${lang}`]: translatedQuestion,
        [`answer_${lang}`]: translatedAnswer,
      };
    });

    // Return the response with FAQs
    res.status(200).json({ faqs: translatedFaqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching FAQs' });
  }
});


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
