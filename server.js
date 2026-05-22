const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  techStack: [String],
  category: String
});

const Project = mongoose.model('Project', projectSchema);

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Seed initial projects if database is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      const initialProjects = [
        {
          title: "Image Steganography",
          description: "Hide secret images inside other images using advanced encryption techniques. Perfect for secure data transfer.",
          imageUrl: "/images/stego.jpg",
          techStack: ["Python", "OpenCV", "Cryptography"],
          category: "Security"
        },
        {
          title: "Balance Management System",
          description: "Track all your pending payments and savings in one place. Real-time updates and expense analytics.",
          imageUrl: "/images/balance.jpg",
          techStack: ["React", "Node.js", "MongoDB"],
          category: "Finance"
        },
        {
          title: "E-Commerce Dashboard",
          description: "Complete admin dashboard for managing products, orders, and customers with live analytics.",
          imageUrl: "/images/ecommerce.jpg",
          techStack: ["React", "Tailwind", "Express"],
          category: "Web App"
        },
        {
          title: "AI Chat Assistant",
          description: "Smart chatbot powered by OpenAI API for customer support automation.",
          imageUrl: "/images/chatbot.jpg",
          techStack: ["Python", "Flask", "OpenAI"],
          category: "AI"
        }
      ];
      
      await Project.insertMany(initialProjects);
      console.log('✅ Added sample projects');
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});