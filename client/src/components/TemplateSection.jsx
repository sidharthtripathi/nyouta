import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateSection = ({ weddingTemplates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weddingTemplates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};

export default TemplateSection;