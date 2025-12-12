const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const envLocalPath = path.resolve(__dirname, '../.env.local');
const envFallbackPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envFallbackPath)) {
  dotenv.config({ path: envFallbackPath });
} else {
  dotenv.config();
}

const User = require('./src/models/User');
const Project = require('./src/models/Project');
const SocialMedia = require('./src/models/SocialMedia');

const sampleProjects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with React and Node.js',
    longDescription: 'This is a full-stack portfolio website featuring a landing page, project showcase, and admin dashboard for content management. Built with modern technologies and best practices.',
    imageUrl: 'https://via.placeholder.com/400x300',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Vite'],
    githubUrl: 'https://github.com/example/portfolio',
    liveUrl: 'https://example.com',
    featured: true,
    order: 1
  },
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with payment integration',
    longDescription: 'Full-featured e-commerce platform with product management, shopping cart, user authentication, and payment processing.',
    imageUrl: 'https://via.placeholder.com/400x300',
    technologies: ['React', 'Redux', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
    order: 2
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool for teams',
    longDescription: 'A comprehensive task management application with real-time updates, team collaboration features, and project tracking.',
    imageUrl: 'https://via.placeholder.com/400x300',
    technologies: ['Vue.js', 'Socket.io', 'Node.js', 'MySQL'],
    githubUrl: 'https://github.com/example/taskmanager',
    liveUrl: 'https://tasks.example.com',
    order: 3
  }
];

const sampleSocialMedia = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/jafrojas',
    displayName: 'Instagram',
    order: 1
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/jafrojas',
    displayName: 'LinkedIn',
    order: 2
  },
  {
    platform: 'github',
    url: 'https://github.com/JafRojasCR',
    displayName: 'GitHub',
    order: 3
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await SocialMedia.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });
    await adminUser.save();
    console.log('Created admin user: username=admin, password=admin123');

    // Create sample projects
    await Project.insertMany(sampleProjects);
    console.log(`Created ${sampleProjects.length} sample projects`);

    // Create social media links
    await SocialMedia.insertMany(sampleSocialMedia);
    console.log(`Created ${sampleSocialMedia.length} social media links`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nNext steps:');
    console.log('1. From the project root run: npm run dev');
    console.log('2. Login with username: admin, password: admin123');
    console.log('3. Open http://localhost:5173/admin to manage content');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
