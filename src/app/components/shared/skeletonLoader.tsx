import React from 'react'

interface SkeletonLoaderProps {
  height: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ height }) => (
  <div className="animate-pulse bg-gray-200 rounded" style={{ height }} />
)

export default SkeletonLoader