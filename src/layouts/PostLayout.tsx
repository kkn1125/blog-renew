import React from "react";

function PostLayout({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return <div>{children}</div>;
}

export default PostLayout;
