import Quill from "quill";
import { useEffect, useState } from "react";

export default function TestModal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const editor = new Quill("#test-text-editor", {
      modules: {
        toolbar: true,
      },
      placeholder: "교회소개를 작성해주세요",
      theme: "snow",
    });
  }, [mounted]);

  return (
    <div>
      <div id="test-text-editor"></div>
    </div>
  );
}
