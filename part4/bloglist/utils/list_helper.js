const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  return blogs.reduce(
    (accumulator, blog) => {
      if (blog.likes >= accumulator.likes) {
        return blog;
      } else {
        return accumulator;
      }
    },
    {
      _id: "",
      title: "",
      author: "",
      url: "",
      likes: 0,
      __v: 0,
    }
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorWithMostBlogs = { author: "", blogs: 0 };

  blogs.reduce((accumulator, { author }) => {
    const blogCount = (accumulator.get(author) || 0) + 1;
    accumulator.set(author, blogCount);
    if (blogCount >= authorWithMostBlogs.blogs) {
      authorWithMostBlogs.author = author;
      authorWithMostBlogs.blogs = blogCount;
    }
    return accumulator;
  }, new Map());

  return authorWithMostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
