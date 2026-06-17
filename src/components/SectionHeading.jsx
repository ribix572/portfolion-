import React from 'react';

export function SectionHeading({ overline, title, description }) {
  return (
    <div className="section-heading">
      <span className="section-overline">{overline}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
