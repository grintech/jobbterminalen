import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const JobCardSkeleton = () => (
     <div className="card company_list_card h-100">
      <div className="card-body">
        <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f9f9f9">
             <div className="d-flex justify-content-between align-items-center mb-3">
            <Skeleton circle={true} height={30} width={30} />
            <Skeleton circle={true} height={30} width={30} />
        </div>
         <div className="mb-2">
          <Skeleton width={100} height={15} />
        </div>
        <div className="mb-2">
          <Skeleton width={`80%`} height={18} />
        </div>
        <div className="mb-3">
          <Skeleton width={`90%`} height={15} />
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <Skeleton width={100} height={20} borderRadius={4} />
          <Skeleton width={100} height={20} borderRadius={4} />
          <Skeleton width={160} height={20} borderRadius={4} />
        </div>
        </SkeletonTheme>
       
      </div>
    </div>
);
