import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, Eye, Calendar } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// Mock data for demo purposes (since we can't connect to actual backend in this environment)
const mockVideos = [
  {
    _id: '1',
    title: 'Introduction to MERN Stack',
    description: 'Learn the basics of MongoDB, Express, React, and Node.js in this comprehensive tutorial.',
    url: 'https://www.youtube.com/embed/7CqJlxBYj-M',
    thumbnail: 'https://picsum.photos/seed/video1/320/180',
    channel: 'Tech Academy',
    duration: '15:30',
    views: 12500,
    likes: 890,
    uploadDate: '2024-01-15'
  },
  {
    _id: '2',
    title: 'Building Modern Web Applications',
    description: 'Complete guide to building scalable web applications with best practices.',
    url: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
    thumbnail: 'https://picsum.photos/seed/video2/320/180',
    channel: 'Code Masters',
    duration: '22:15',
    views: 8300,
    likes: 654,
    uploadDate: '2024-01-10'
  },
  {
    _id: '3',
    title: 'React Hooks Tutorial',
    description: 'Deep dive into useState, useEffect, and custom hooks for modern React development.',
    url: 'https://www.youtube.com/embed/f687hBjwFcM',
    thumbnail: 'https://picsum.photos/seed/video3/320/180',
    channel: 'React Experts',
    duration: '18:45',
    views: 15600,
    likes: 1200,
    uploadDate: '2024-01-20'
  },
  {
    _id: '4',
    title: 'MongoDB Database Design',
    description: 'Learn how to design efficient database schemas for MongoDB.',
    url: 'https://www.youtube.com/embed/3GHZd0zv170',
    thumbnail: 'https://picsum.photos/seed/video4/320/180',
    channel: 'Database Pros',
    duration: '20:00',
    views: 9800,
    likes: 750,
    uploadDate: '2024-01-12'
  },
  {
    _id: '5',
    title: 'Express.js API Development',
    description: 'Build RESTful APIs with Express.js from scratch.',
    url: 'https://www.youtube.com/embed/SccSCuHhOw0',
    thumbnail: 'https://picsum.photos/seed/video5/320/180',
    channel: 'API Masters',
    duration: '25:30',
    views: 11200,
    likes: 890,
    uploadDate: '2024-01-18'
  },
  {
    _id: '6',
    title: 'Node.js Best Practices',
    description: 'Learn industry-standard best practices for Node.js applications.',
    url: 'https://www.youtube.com/embed/BKorP55Aqvg',
    thumbnail: 'https://picsum.photos/seed/video6/320/180',
    channel: 'Node Academy',
    duration: '17:20',
    views: 13400,
    likes: 1050,
    uploadDate: '2024-01-08'
  },
  {
    _id: '7',
    title: 'CSS Grid Layout Mastery',
    description: 'Master CSS Grid and create complex layouts with ease.',
    url: 'https://www.youtube.com/embed/EFafSYg-PkI',
    thumbnail: 'https://picsum.photos/seed/video7/320/180',
    channel: 'CSS Wizards',
    duration: '19:45',
    views: 10500,
    likes: 820,
    uploadDate: '2024-01-14'
  },
  {
    _id: '8',
    title: 'JavaScript ES6 Features',
    description: 'Explore modern JavaScript features including arrow functions, destructuring, and more.',
    url: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
    thumbnail: 'https://picsum.photos/seed/video8/320/180',
    channel: 'JS Masters',
    duration: '23:10',
    views: 14200,
    likes: 1100,
    uploadDate: '2024-01-16'
  },
  {
    _id: '9',
    title: 'Docker for Beginners',
    description: 'Learn Docker containerization from the ground up.',
    url: 'https://www.youtube.com/embed/fqMOX6JJhGo',
    thumbnail: 'https://picsum.photos/seed/video9/320/180',
    channel: 'DevOps Hub',
    duration: '28:30',
    views: 18900,
    likes: 1450,
    uploadDate: '2024-01-11'
  },
  {
    _id: '10',
    title: 'TypeScript Fundamentals',
    description: 'Get started with TypeScript and add type safety to your JavaScript projects.',
    url: 'https://www.youtube.com/embed/BwuLxPH8IDs',
    thumbnail: 'https://picsum.photos/seed/video10/320/180',
    channel: 'Type Gurus',
    duration: '21:15',
    views: 16700,
    likes: 1320,
    uploadDate: '2024-01-13'
  },
  {
    _id: '11',
    title: 'Git and GitHub Complete Guide',
    description: 'Master version control with Git and collaborate on GitHub.',
    url: 'https://www.youtube.com/embed/RGOj5yH7evk',
    thumbnail: 'https://picsum.photos/seed/video11/320/180',
    channel: 'Code Control',
    duration: '26:40',
    views: 22100,
    likes: 1780,
    uploadDate: '2024-01-09'
  },
  {
    _id: '12',
    title: 'RESTful API Design Principles',
    description: 'Learn best practices for designing clean and maintainable APIs.',
    url: 'https://www.youtube.com/embed/lsMQRaeKNDk',
    thumbnail: 'https://picsum.photos/seed/video12/320/180',
    channel: 'API Architects',
    duration: '24:20',
    views: 13800,
    likes: 1050,
    uploadDate: '2024-01-17'
  },
  {
    _id: '13',
    title: 'Authentication with JWT',
    description: 'Implement secure authentication using JSON Web Tokens.',
    url: 'https://www.youtube.com/embed/mbsmsi7l3r4',
    thumbnail: 'https://picsum.photos/seed/video13/320/180',
    channel: 'Security First',
    duration: '20:55',
    views: 11900,
    likes: 920,
    uploadDate: '2024-01-19'
  },
  {
    _id: '14',
    title: 'Redux State Management',
    description: 'Learn Redux for managing complex application state in React.',
    url: 'https://www.youtube.com/embed/poQXNp9ItL4',
    thumbnail: 'https://picsum.photos/seed/video14/320/180',
    channel: 'State Masters',
    duration: '27:30',
    views: 15300,
    likes: 1180,
    uploadDate: '2024-01-07'
  },
  {
    _id: '15',
    title: 'AWS Cloud Fundamentals',
    description: 'Introduction to Amazon Web Services and cloud computing basics.',
    url: 'https://www.youtube.com/embed/ulprqHHWlng',
    thumbnail: 'https://picsum.photos/seed/video15/320/180',
    channel: 'Cloud Academy',
    duration: '32:10',
    views: 19400,
    likes: 1520,
    uploadDate: '2024-01-06'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(mockVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchQuery, videos]);

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentPage('player');
  };

  const handleLike = () => {
    if (selectedVideo) {
      setSelectedVideo({ ...selectedVideo, likes: selectedVideo.likes + 1 });
      setVideos(videos.map(v => 
        v._id === selectedVideo._id ? { ...v, likes: v.likes + 1 } : v
      ));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage('home'); // Navigate to home when searching
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-red-600 rounded-lg p-2">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">YouTube Clone</h1>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-full w-96 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentPage === 'home' ? (
        <HomePage 
          videos={filteredVideos} 
          onVideoClick={handleVideoClick}
          formatViews={formatViews}
          formatDate={formatDate}
          searchQuery={searchQuery}
        />
      ) : (
        <VideoPlayer 
          video={selectedVideo} 
          videos={videos}
          onVideoClick={handleVideoClick}
          onLike={handleLike}
          formatViews={formatViews}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

function HomePage({ videos, onVideoClick, formatViews, formatDate, searchQuery }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {searchQuery && (
        <div className="mb-4">
          <p className="text-gray-600">
            Found {videos.length} result{videos.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}
      
      {videos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No videos found</p>
          <p className="text-gray-400 mt-2">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onVideoClick(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatViews(video.views)} views
                  </span>
                  <span>•</span>
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function VideoPlayer({ video, videos, onVideoClick, onLike, formatViews, formatDate }) {
  if (!video) return null;

  const relatedVideos = videos.filter(v => v._id !== video._id).slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              src={video.url}
              className="w-full aspect-video"
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">{video.title}</h1>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatViews(video.views)} views
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(video.uploadDate)}
              </span>
            </div>
            <button
              onClick={onLike}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ThumbsUp className="w-5 h-5" />
              <span className="font-medium">{formatViews(video.likes)}</span>
            </button>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {video.channel.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{video.channel}</h3>
              </div>
            </div>
            <p className="text-gray-700">{video.description}</p>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Videos</h2>
          <div className="space-y-3">
            {relatedVideos.map((relatedVideo) => (
              <div
                key={relatedVideo._id}
                className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => onVideoClick(relatedVideo)}
              >
                <div className="relative shrink-0">
                  <img
                    src={relatedVideo.thumbnail}
                    alt={relatedVideo.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {relatedVideo.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {relatedVideo.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">{relatedVideo.channel}</p>
                  <div className="text-xs text-gray-500">
                    {formatViews(relatedVideo.views)} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;