// controllers/blogController.js

const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Review = require('../models/review');
const { isAuthenticated, isSubscribed } = require('../middleware/authorizationMiddleware');

const searchBlogTitles = async (req, res) => {
  const { query } = req.params;

  try {
    const matchingTitles = await Blog.find({ title: { $regex: `^${query}`, $options: 'i' } }).select('title');
    res.status(200).json(matchingTitles);
  } catch (error) {
    console.error('Error searching blog titles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const aggregateBlogStats = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'blogId',
          as: 'reviews',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          numReviews: { $size: '$reviews' },
          overallRating: {
            $avg: '$reviews.rating',
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error aggregating blog stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const blogs = await Blog.find({
      publishDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting blogs by date range:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogs = await Blog.find({ category });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting blogs by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogsWithCaching = async (req, res) => {
  const cacheKey = 'blogs';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('Data fetched from cache');
    return res.status(200).json(cachedData);
  }

  try {
    const blogs = await Blog.find();
    cache.set(cacheKey, blogs, 60); // Cache for 60 seconds
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  searchBlogTitles,
  aggregateBlogStats,
  getBlogsByDateRange,
  getBlogsByCategory,
  getBlogsWithCaching,
};
