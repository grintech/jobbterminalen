import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Faq = () => {

  const { t } = useTranslation();

  return (
 <>
  <div className="faq_page">
<Navbar />
<div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
    <h1 className="fw-bold position-relative">{ t("Faqs")}</h1>
</div>

<div className="faq_section py-4">
    <div className="container">
    <div className="col-12 py-4 border-bottom">
        <h4 className="mb-3">{ t("FaqsHead")}</h4>
        <p className="m-0">{ t("FaqsText")}</p>
    </div>
    <div className="row mt-5">
        <div className="col-lg-4 mb-5 mb-lg-0">
        <div className="card card_sticky">
            <div className="card-body">
            <div
                className="nav flex-column nav-pills "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <button
                className="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                >
                (1) { t("FaqTabHead1")}
                </button>

                <button
                className="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                >
                (2) { t("FaqTabHead2")}
                </button>

                <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
                >
                (3) { t("FaqTabHead3")}
                </button>
            </div>
            </div>
        </div>
        </div>
        <div className="col-lg-8">
        <div className="tab-content" id="v-pills-tabContent">
            <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
            tabIndex="0"
            >
            <div>
                <h4>{ t("FaqTabHead1")}</h4>
                <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        { t("FaqAccordion1")}
                    </button>
                    </h2>
                    <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText1")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                    >
                        { t("FaqAccordion2")}
                    </button>
                    </h2>
                    <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText2")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                    >
                        { t("FaqAccordion3")}
                    </button>
                    </h2>
                    <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText3")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                    >
                        { t("FaqAccordion4")}
                    </button>
                    </h2>
                    <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText4")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                    >
                        { t("FaqAccordion5")}
                    </button>
                    </h2>
                    <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText5")}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
            tabIndex="0"
            >
            <div>
                <h4>{ t("FaqTabHead2")}</h4>
                <div className="accordion" id="accordionExample1">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse6"
                        aria-expanded="true"
                        aria-controls="collapse6"
                    >
                        { t("FaqAccordion6")}
                    </button>
                    </h2>
                    <div
                    id="collapse6"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample1"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText6")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse7"
                        aria-expanded="false"
                        aria-controls="collapse7"
                    >
                        { t("FaqAccordion7")}
                    </button>
                    </h2>
                    <div
                    id="collapse7"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample1"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText7")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8"
                        aria-expanded="false"
                        aria-controls="collapse8"
                    >
                        { t("FaqAccordion8")}
                    </button>
                    </h2>
                    <div
                    id="collapse8"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample1"
                    >
                    <div className="accordion-body">
                        { t("FaqAccordionText8")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse9"
                        aria-expanded="false"
                        aria-controls="collapse9"
                    >
                        { t("FaqAccordion9")}
                    </button>
                    </h2>
                    <div
                    id="collapse9"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample1"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText9")}
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse10"
                        aria-expanded="false"
                        aria-controls="collapse10"
                    >
                        { t("FaqAccordion10")}
                    </button>
                    </h2>
                    <div
                    id="collapse10"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample1"
                    >
                    <div className="accordion-body">
                    { t("FaqAccordionText10")}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
            tabIndex="0"
            >
            <h4>{ t("FaqTabHead3")}</h4>
            <div className="accordion" id="accordionExample2">
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse11"
                    aria-expanded="true"
                    aria-controls="collapse11"
                    >
                    { t("FaqAccordion11")}
                    </button>
                </h2>
                <div
                    id="collapse11"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample2"
                >
                    <div className="accordion-body">
                    { t("FaqAccordionText11")}
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse12"
                    aria-expanded="false"
                    aria-controls="collapse12"
                    >
                    { t("FaqAccordion12")}
                    </button>
                </h2>
                <div
                    id="collapse12"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2"
                >
                    <div className="accordion-body">
                    { t("FaqAccordionText12")}
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse13"
                    aria-expanded="false"
                    aria-controls="collapse13"
                    >
                    { t("FaqAccordion13")}
                    </button>
                </h2>
                <div
                    id="collapse13"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2"
                >
                    <div className="accordion-body">
                    { t("FaqAccordionText13")}
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse14"
                    aria-expanded="false"
                    aria-controls="collapse14"
                    >
                    { t("FaqAccordion14")}
                    </button>
                </h2>
                <div
                    id="collapse14"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2"
                >
                    <div className="accordion-body">
                    { t("FaqAccordionText14")}
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse15"
                    aria-expanded="false"
                    aria-controls="collapse15"
                    >
                    { t("FaqAccordion15")}
                    </button>
                </h2>
                <div
                    id="collapse15"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2"
                >
                    <div className="accordion-body">
                    { t("FaqAccordionText15")}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div className="mt-5 py-4 bg-white">
        <div className="col-lg-7 col-md-9 col-12 text-center mx-auto p-3">
        <h4 className="text-center">{t("CallActionHead")}</h4>
        <p className="text-muted ">{t("CallActionText")}</p>
        <Link
            to="/contact"
            className="btn btn-register fs-6 px-4 py-2 rounded-3"
        >{t("ContactUs")}</Link>
        </div>
    </div>
    </div>
</div>

<Footer />
  </div>
 </>
  );
};

export default Faq;
