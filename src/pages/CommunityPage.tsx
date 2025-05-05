import React, { useState } from 'react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const defaultAvatar = 'https://i.postimg.cc/WzfKp2mL/image.png';

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Zestly',
    avatar: defaultAvatar,
    content: 'Welcome to the Community Chatroom! Ask questions, share healthy hacks, or motivate others.',
    timestamp: new Date().toLocaleString(),
    replies: [],
  },
];

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: 'You',
      avatar: defaultAvatar,
      content: newPost,
      timestamp: new Date().toLocaleString(),
      replies: [],
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleReply = (postId: number) => {
    if (!replyContent[postId]?.trim()) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                author: 'You',
                avatar: defaultAvatar,
                content: replyContent[postId],
                timestamp: new Date().toLocaleString(),
              },
            ],
          }
        : post
    ));
    setReplyContent({ ...replyContent, [postId]: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-24 sm:pt-28 flex flex-col items-center px-2">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-100 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Community Chatroom</h2>
        <p className="text-neutral-500 text-center mb-6">Ask questions, share healthy hacks, or motivate each other! (AI moderation coming soon)</p>
        <div className="flex gap-3 mb-6">
          <img src={defaultAvatar} alt="avatar" className="h-12 w-12 rounded-full border shadow" />
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share something..."
            className="flex-1 border border-neutral-300 rounded-lg px-4 py-2 bg-neutral-50 placeholder:text-neutral-400 text-base focus:outline-none focus:ring-2 focus:ring-primary-200 min-h-[48px]"
          />
          <button
            onClick={handlePost}
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-600 transition-all disabled:opacity-50"
            disabled={!newPost.trim()}
          >
            Post
          </button>
        </div>
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-neutral-50 rounded-xl shadow p-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={post.avatar} alt="avatar" className="h-10 w-10 rounded-full border" />
                <div>
                  <div className="font-semibold text-gray-700">{post.author}</div>
                  <div className="text-xs text-neutral-400">{post.timestamp}</div>
                </div>
              </div>
              <div className="ml-1 mb-3 text-gray-800">{post.content}</div>
              <div className="ml-1">
                <div className="flex gap-2 items-center mb-2">
                  <textarea
                    value={replyContent[post.id] || ''}
                    onChange={e => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                    placeholder="Reply..."
                    className="flex-1 border border-neutral-300 rounded-lg px-3 py-1 bg-neutral-50 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 min-h-[32px]"
                  />
                  <button
                    onClick={() => handleReply(post.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg font-semibold shadow hover:bg-blue-600 transition-all disabled:opacity-50"
                    disabled={!replyContent[post.id]?.trim()}
                  >
                    Reply
                  </button>
                </div>
                <div className="space-y-2 ml-4">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="flex items-center gap-2">
                      <img src={reply.avatar} alt="avatar" className="h-8 w-8 rounded-full border" />
                      <div>
                        <div className="font-medium text-gray-700 text-sm">{reply.author}</div>
                        <div className="text-xs text-neutral-400">{reply.timestamp}</div>
                        <div className="text-gray-800 text-sm">{reply.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
