import { LoadingSpinner } from './LoadingSpinner'

export const PageLoading = () => {
  return (
    <div className="loading-container">
    <div className="loading-text">
      <h1>Loading</h1>
    </div>
    <div className="spinner-container">
      <LoadingSpinner />
    </div>
  </div>
);
};
