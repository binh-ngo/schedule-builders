import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import LoadType from './LoadType'

export const PageLoading = () => {
  return (
    <div className="loading-container">
    <div className="loading-text">
      <h1><LoadType /></h1>
    </div>
    <div className="spinner-container">
      <LoadingSpinner />
    </div>
  </div>
);
};
