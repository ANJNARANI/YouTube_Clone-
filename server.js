// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/youtube-clone')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Video Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  thumbnail: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  channel: String,
  uploadDate: { type: Date, default: Date.now },
  duration: String,
});

const Video = mongoose.model('Video', videoSchema);

// Routes

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadDate: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single video
app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    // Increment views
    video.views += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create video
app.post('/api/videos', async (req, res) => {
  const video = new Video(req.body);
  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like video
app.patch('/api/videos/:id/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed sample data (run once)
app.post('/api/seed', async (req, res) => {
  const sampleVideos = [
    {
      title: 'Introduction to MERN Stack',
      description: 'Learn the basics of MongoDB, Express, React, and Node.js',
      url: 'https://www.youtube.com/embed/7CqJlxBYj-M',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
      channel: 'Tech Academy',
      duration: '15:30',
      views: 12500,
      likes: 890,
    },
    {
      title: 'Building Modern Web Applications',
      description: 'Complete guide to building scalable web apps',
      url: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
      channel: 'Code Masters',
      duration: '22:15',
      views: 8300,
      likes: 654,
    },
    {
      title: 'React Hooks Tutorial',
      description: 'Deep dive into useState, useEffect, and custom hooks',
      url: 'https://www.youtube.com/embed/f687hBjwFcM',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
      channel: 'React Experts',
      duration: '18:45',
      views: 15600,
      likes: 1200,
    },
  ];

  try {
    await Video.deleteMany({});
    await Video.insertMany(sampleVideos);
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});