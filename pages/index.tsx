import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

export default function Home() {
  return (
    <>
      <p>
        This is a bare-bones unstyled MDX editor without any plugins and no
        toolbar. Check the components/Editor.tsx file for the code.
      </p>
      <p>
        To enable more features, add the respective plugins to your instance -
        see{" "}
        <a href="https://mdxeditor.dev/editor/docs/getting-started">the docs</a>{" "}
        for more details.
      </p>
      <br />
      <Editor />
    </>
  );
}
