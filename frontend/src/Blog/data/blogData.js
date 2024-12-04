import React from "react";

const WhyNow = React.lazy(() => import("../Posts/WhyNow"));

export const blogPosts = [
  {
    id: "1",
    title: "Why a Blog, and Why Now?",
    slug: "why-a-blog-and-why-now",
    tag: "WELCOME",
    sub: "Teaching makes people better, and how I want to use this space to learn by teaching.",
    component: WhyNow,
    image:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 0,
    date: "December 3, 2024",
  },
  // {
  //   id: "2",
  //   title: "Second Post",
  //   slug: "second-post",
  //   component: null,
  //   image: "/images/second-post.jpg",
  //   likes: 0,
  // },
];
