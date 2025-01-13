import MoviesRow from '@/components/MoviesRow';

const HomePage = () => {
  return (
    <>
      <MoviesRow
        categoryId='popular'
        categoryName='Popular 🤩'
      />
      <MoviesRow
        categoryId='now-playing'
        categoryName='Now playing ▶️'
      />
      <MoviesRow
        categoryId='upcoming'
        categoryName='Upcoming ⌚'
      />
      <MoviesRow
        categoryId='top-rated'
        categoryName='Top Rated 👍'
      />
      <MoviesRow
        categoryId='favorites'
        categoryName='Favorites ⭐'
      />
    </>
  );
};

export default HomePage;
