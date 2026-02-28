export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "blogContent.title.post1",
    excerpt: "blogContent.excerpt.post1",
    content: "blogContent.content.post1",
    date: "blogContent.date.post1",
    readTime: "blogContent.readTime.post1",
    category: "blogContent.category.post1",
    image: "/yassine/1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "blogContent.title.post2",
    excerpt: "blogContent.excerpt.post2",
    content: "blogContent.content.post2",
    date: "blogContent.date.post2",
    readTime: "blogContent.readTime.post2",
    category: "blogContent.category.post2",
    image: "/yassine/2.webp",
  },
  {
    id: 3,
    title: "blogContent.title.post3",
    excerpt: "blogContent.excerpt.post3",
    content: "blogContent.content.post3",
    date: "blogContent.date.post3",
    readTime: "blogContent.readTime.post3",
    category: "blogContent.category.post3",
    image: "/yassine/3.jpg",
  },
  {
    id: 4,
    title: "blogContent.title.post4",
    excerpt: "blogContent.excerpt.post4",
    content: "blogContent.content.post4",
    date: "blogContent.date.post4",
    readTime: "blogContent.readTime.post4",
    category: "blogContent.category.post4",
    image: "/yassine/4.jpg",
  },
  {
    id: 5,
    title: "blogContent.title.post5",
    excerpt: "blogContent.excerpt.post5",
    content: "blogContent.content.post5",
    date: "blogContent.date.post5",
    readTime: "blogContent.readTime.post5",
    category: "blogContent.category.post5",
    image: "/yassine/5.webp",
  },
  {
    id: 6,
    title: "blogContent.title.post6",
    excerpt: "blogContent.excerpt.post6",
    content: "blogContent.content.post6",
    date: "blogContent.date.post6",
    readTime: "blogContent.readTime.post6",
    category: "blogContent.category.post6",
    image: "/yassine/6.jpg",
  },
];
