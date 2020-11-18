const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    let mostLiked = blogs.sort((a, b) => b.likes - a.likes)[0];
    return {
       title: mostLiked.title,
       author: mostLiked.author,
       likes: mostLiked.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
