import { useParams } from "react-router-dom";
import ModernLayout from "../resume-builder/layouts/ModernLayout";
import ElegantLayout from "../resume-builder/layouts/ElegantLayout";
import CreativeLayout from "../resume-builder/layouts/CreativeLayout";


const TemplatePage = () => {
  const { id } = useParams();

  const renderLayout = () => {
    switch (id) {
      case "modern":
        return <ModernLayout />;
      case "elegant":
        return <ElegantLayout />;
      case "creative":
        return <CreativeLayout />;
      default:
        return <div>" Template not found "  
        </div>;
    }
  };

  return (
    <div className="p-4">
      <div className="col-lg-8 mx-auto bg-white p-4 text-center">{renderLayout()}</div>
    </div>
  );
};

export default TemplatePage;
