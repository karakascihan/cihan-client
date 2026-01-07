import React from "react";

type PageMetaProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const PageMeta = ({
  title,
  description,
  children,
}: PageMetaProps) => {
  return (
    <>
      {/* React 19 native head management */}
      <title>{title}</title>

      {description && (
        <meta name="description" content={description} />
      )}

      {/* Sayfa içeriği */}
      {children}
    </>
  );
};

export default PageMeta;
