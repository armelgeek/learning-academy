"use client"

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";


const RichEditor = ({ placeholder, onChange, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default RichEditor;
