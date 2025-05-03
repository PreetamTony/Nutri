export interface NutriXTalk {
  title: string;
  url: string;
  thumbnail: string;
  speaker: string;
  bio: string;
  tags: string[];
}

export const nutrixTalks: NutriXTalk[] = [
  {
    title: 'What is a healthy relationship with food?',
    url: 'https://www.youtube.com/embed/6CQyaeZWAXE?si=eFdJPkrmWDtGVt6X',
    thumbnail: 'https://img.youtube.com/vi/6CQyaeZWAXE/hqdefault.jpg',
    speaker: 'Rhiannon Lambert',
    bio: 'Registered Dietitian and Nutrition Scientist. TEDx speaker on practical nutrition for all ages.',
    tags: ['Nutrition', 'Balanced Diet', 'Science'],
  },
  {
    title: 'Food Addiction: Craving the Truth About Food',
    url: 'https://www.youtube.com/embed/C0pLIjQG1q0?si=L6Y8hCC6BosZn6Ho',
    thumbnail: 'https://img.youtube.com/vi/C0pLIjQG1q0/hqdefault.jpg',
    speaker: 'Andrew Becker',
    bio: 'Chef, mindfulness advocate, and author of "Eating with Intention".',
    tags: ['Mindful Eating', 'Wellness', 'Habits'],
  },
  {
    title: 'Emotional Eating: What if Weight Loss Isn\'t about the Food?',
    url: 'https://www.youtube.com/embed/SVSe2vaxXXM?si=kjGCZzakjQ0NXmYk',
    thumbnail: 'https://img.youtube.com/vi/SVSe2vaxXXM/hqdefault.jpg',
    speaker: 'Tricia Nelson',
    bio: 'Clinical psychologist and nutrition researcher specializing in mental health.',
    tags: ['Mental Health', 'Nutrition', 'Wellness'],
  },
  {
    title: 'Six behaviors to increase your confidence',
    url: 'https://www.youtube.com/embed/IitIl2C3Iy8?si=eK3pp_BAbM-rdFKk',
    thumbnail: 'https://img.youtube.com/vi/IitIl2C3Iy8/hqdefault.jpg',
    speaker: 'Emily Jaenson',
    bio: 'Food science professor and public speaker on food myths and facts.',
    tags: ['Superfoods', 'Science', 'Nutrition'],
  },
  {
    title: 'Persistence is Pivotal',
    url: 'https://www.youtube.com/embed/xz3tjI5cmrQ?si=A7llBQoFicsL5U6r',
    thumbnail: 'https://img.youtube.com/vi/xz3tjI5cmrQ/hqdefault.jpg',
    speaker: 'Dr Meenakshi Chaudhary',
    bio: 'Certified health coach and lifestyle blogger.',
    tags: ['Healthy Living', 'Lifestyle', 'Productivity'],
  },
];
