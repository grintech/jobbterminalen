import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EmploymentTypes = () => {

  const { t } = useTranslation();

  const EmpTypes = [
  { index: 0, name: "Full Time", value: "full_time" },
  { index: 1, name: "Part Time", value: "part_time" },
  { index: 2, name: "Contract", value: "contract" },
  { index: 3, name: "Freelancer", value: "freelancer" },
  { index: 4, name: "Internship", value: "internship" },
  { index: 5, name: "Permanent", value: "permanent" },
  { index: 6, name: "Probation", value: "probation" },
];

  return (
    <>
    <div className=" popular_categories container mt-5 pb-4">
      <div className="row justify-content-center flex-wrap pt-3">
        <h4 className="text-center ">{t("PopJobCategories")}</h4>
        { EmpTypes.map((emp, index) => (
        <div className="col-lg-2 col-xl col-md-3 col-sm-4 col-4 mt-4" key={index}>
          <Link to={`/job/employment-type/${emp.value.trim().toLowerCase().replace(/\s+/g, '-')}`} className="cat_card">
            <div className="card emp_type_cards h-100">
              <div className="card-body text-center py-5"  >
                {/* <img src="https://jobbterminalen.se/admin/uploads/categories/1750223658_68524b2a17d5c.png" alt={emp.name}></img> */}
               <div className="d-flex flex-column align-items-center justify-content-center">
                 <h5 className="text-capitalize blinking-text1 text-theme m-0">{emp.name}</h5>
                
               </div>
              </div>
            </div>
          </Link>
        </div>

        ))}
      </div>
    </div>
    </>
  );
};

export default EmploymentTypes;
