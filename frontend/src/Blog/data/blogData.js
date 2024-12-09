import React from "react";

const WhyNow = React.lazy(() => import("../Posts/WhyNow"));
const WhySwitchToPowershell = React.lazy(() => import("../Posts/WhySwitchToPowershell"));
const DjangoVsExpress = React.lazy(() => import("../Posts/DjangoVsExpress"));

function slugGen(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove punctuation
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export const blogPosts = [
  {
    id: "1",
    title: "Why a Blog, and Why Now?",
    tag: "WELCOME",
    sub: "Teaching makes people better, and I want to use this space to learn by teaching.",
    component: WhyNow,
    image:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 0,
    date: "December 1, 2024",
  },
  {
    id: "2",
    title: "Why I Finally Switched To Powershell",
    tag: "DJANGO vs. WINDOWS GITBASH",
    sub: "After lots of attempts to run pip install and countless errors, I decided it was finally time to stop emulating a Mac/Bash setup and learn to love the bomb.",
    component: WhySwitchToPowershell,
    image:
      "https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 0,
    date: "December 4, 2024",
  },
  {
    id: "3",
    title: "Django vs. Express and Postgres: A Totally Different Path",
    tag: "BACKEND: Python vs. JavaScript",
    sub: "Reflecting on some of the immediate differences I noticed between running the Node.js/Express/Postgres stack I've become used to and running my first Django app",
    component: DjangoVsExpress,
    image:
      "https://images.unsplash.com/photo-1580121521203-ab94824d9382?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 0,
    date: "December 9, 2024",
  },
];

blogPosts.forEach((post) => {
  post.slug = slugGen(post.title);
});
