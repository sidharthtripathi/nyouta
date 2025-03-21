import React, { useState } from "react";
import TemplateCard from "./TemplateCard";

const TemplateSection = ({ weddingTemplates }) => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {weddingTemplates?.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          template={template.content}
          image={template.image}
          setShowForm={setShowForm}
          setId={setId}
        />
      ))}
    </div>
  );
};

export default TemplateSection;
