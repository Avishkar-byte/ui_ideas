// src/pages/blogs/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { colorPalette } from '../../styles/colors';

type Post = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
};

const posts: Post[] = [
  {
    id: 1,
    title: 'Building Meaningful Connections in the Digital Age',
    excerpt:
      "Discover how college students are leveraging technology to create lasting friendships and professional networks in today's digital world.",
    image: '/meaninful.png',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Community',
    content: [
      "In today's fast-paced digital world, building meaningful connections has become both more accessible and more challenging than ever before. College students, in particular, face unique opportunities and obstacles when it comes to forming lasting relationships in the digital age.",
      "Technology has revolutionized the way we connect with others. While social media platforms have made it easier to stay in touch, they often lack the depth and authenticity that genuine relationships require. This is where Gingr steps in, offering a unique approach to digital connections that prioritizes meaningful interactions over superficial engagements.",
      // ...etc
    ],
  },
  {
    id: 2,
    title: 'Privacy First: The Future of Social Networking',
    excerpt:
      'Why privacy-focused platforms are becoming increasingly important for students and how Gingr is leading the charge.',
    image: '/secured.png',
    date: 'March 12, 2024',
    readTime: '4 min read',
    category: 'Privacy & Security',
    content: [
      "In an era where data breaches and privacy concerns are making headlines, the importance of privacy-focused social networking platforms cannot be overstated. Students, in particular, are becoming increasingly aware of the need to protect their digital footprint while staying connected.",
      // ...etc
    ],
  },
  {
    id: 3,
    title: 'Finding Your Tribe: Interest-Based Communities',
    excerpt:
      'How to connect with like-minded students and build communities around shared interests and academic goals.',
    image: '/interest_based.png',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Features',
    content: [
      "One of the most exciting aspects of college life is discovering and connecting with people who share your interests and passions. Gingr's interest-based communities feature makes this process easier and more meaningful than ever before.",
      // ...etc
    ],
  },
  {
    id: 4,
    title: 'The Power of Anonymous Expression',
    excerpt:
      'Understanding the benefits of anonymous communication in fostering open discussions and authentic connections.',
    image: '/anym.png',
    date: 'March 8, 2024',
    readTime: '4 min read',
    category: 'Privacy & Security',
    content: [
      "Anonymity in online communication often gets a bad rap, but when implemented thoughtfully, it can be a powerful tool for fostering authentic connections and meaningful discussions. Gingr's anonymous chatting feature is designed to create safe spaces for honest expression while maintaining community standards.",
      // ...etc
    ],
  },
];

const MainContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: ${colorPalette.white};
`;

const BlogHeader = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9));
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 0 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BlogContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BlogCategory = styled.span`
  background: rgba(255, 215, 0, 0.1);
  color: ${colorPalette.yellow};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 20px;
`;

const BlogDate = styled.div`
  color: ${colorPalette.yellow};
  font-size: 14px;
  margin: 15px 0;
  opacity: 0.8;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${colorPalette.yellow};
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 30px;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateX(-5px);
  }
`;

const Paragraph = styled('p')`
  color: ${colorPalette.white};
  margin-bottom: 20px;
  line-height: 1.8;
`;

export default function BlogPost() {
  const { query } = useRouter();
  const rawId = Array.isArray(query.id) ? query.id[0] : query.id;
  const idx = rawId && /^\d+$/.test(rawId) ? parseInt(rawId, 10) - 1 : -1;
  const post = posts[idx];

  if (!post) {
    return (
      <MainContainer>
        <Typography variant="h5" sx={{ p: 4, color: colorPalette.white }}>
          Post not found.
        </Typography>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <BlogHeader>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <HeaderContent>
          <BlogCategory>{post.category}</BlogCategory>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: colorPalette.white }}
          >
            {post.title}
          </Typography>
          <BlogDate>
            {post.date} &middot; {post.readTime}
          </BlogDate>
        </HeaderContent>
      </BlogHeader>

      <BlogContent>
        <BackButton href="/blogs">&larr; Back to Blogs</BackButton>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: colorPalette.white, opacity: 0.9, mb: 4 }}
        >
          {post.excerpt}
        </Typography>

        {post.content.map((para, i) => (
          <Paragraph key={i}>{para}</Paragraph>
        ))}
      </BlogContent>
    </MainContainer>
  );
}
