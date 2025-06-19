// src/pages/TemplatePreview.jsx
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import templates from "../data/templates";
import { useNavigate } from "react-router-dom";

const TemplatePreview = () => {
  const navigate = useNavigate();

  return (
    <>
        
        <div className="container  py-5">
        <h1 className="fs-3 text-center">Please select a template for your resume. <br />You can always change it later.</h1>
        <div className="row g-4 mt-5">
            {templates.map((template) => (
            <div className="col-md-4">
                <div
                key={template.id}
                className="border-2"
                onClick={() => navigate(`/template/${template.id}`)}
                style={{cursor:"pointer"}}
                >
                <div className="p-2 text-center fw-semibold">{template.name}</div>
                <img src={template.thumbnail} alt={template.name} className="w-100" />
                </div>
            </div>
            ))}
        </div>
        </div>
       
    </>
  );
};

export default TemplatePreview;
