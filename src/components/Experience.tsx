import React from "react";
import indeedLogo from "../images/indeed.png";
import blackbaudLogo from "../images/blackbaud.png";

import "../styles/Experience.scss";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  return (
    <div className="section">
      <h2>Experience</h2>

      <div className="experience-items">
        <ExperienceItem
          imageUrl={indeedLogo}
          position="Software Developer Intern"
          company="Indeed"
          companyUrl="https://www.indeed.com/about"
          timeline="May 2022 - Aug 2022"
          descriptionItems={[
            "Developed tools used for crawling and aggregating job postings from external sources onto Indeed, ultimately helping provide useful search results and recommendations for job seekers.",
            "Improved backend service reliability and maintainability by building microservices encompassing functionality from legacy monolithic backend.",
            "Developed user interface components for newer and more feature-rich web application for job aggregation.",
          ]}
          techUsed={["Java", "Spring Framework", "GraphQL", "MySQL", "RabbitMQ", "React", "Redux"]}
        />

        <ExperienceItem
          imageUrl={blackbaudLogo}
          position="Software Engineer Intern"
          company="Blackbaud"
          companyUrl="https://www.blackbaud.com/"
          timeline="May 2021 - Aug 2021"
          descriptionItems={[
            "Led the development of a microservice suite providing a REST API for interfacing with SOAP-based CRM web application backend, cutting HTTP message size by up to 95% and improving client workflow efficiency.",
            "Transitioned services facilitating custom SSO authentication from on-premises SQL Server to Azure Cosmos DB.",
          ]}
          techUsed={["C#", "ASP.NET Core", "Azure"]}
        />
      </div>
    </div>
  );
}

