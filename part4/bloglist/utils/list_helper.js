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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
