import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CompanyCardsSkeleton = () => (
     <div className="card company_list_card company_sekeleton h-100">
      <div className="card-body position-relative">
        <div className="logo_div" style={{border:"0 !important"}}>
            <Skeleton  height={50} width={50} rounded={10}  />

        </div>
        <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f9f9f9">
          <div className="d-flex justify-content-end align-items-center mb-3">
            <Skeleton circle={true} height={30} width={30} />
         </div>
         <div className="mb-2">
          <Skeleton width={100} height={15} />
        </div>
        <div className="mb-2">
          <Skeleton width={`80%`} height={18} />
        </div>
       <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
         </div>
        </SkeletonTheme>
       
      </div>
    </div>
);
