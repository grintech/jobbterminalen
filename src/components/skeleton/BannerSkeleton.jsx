import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => {
  return (
    <>
    <div className="w-100">
        <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f9f9f9">
           <div className="mb-2">
            <Skeleton  height={200} rounded={10} />
           </div>
        
        </SkeletonTheme>
    </div>
    </>
  )
}

export default BannerSkeleton