import "./ChurchIntroEditModal.scss";

import { useEffect, useState } from "react";
import Quill, { Delta, Op } from "quill/core";
import { homepageTypeALocalStorageRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-repository";

export default function ChurchIntroEditModal({
  churchIntro,
  hide,
}: {
  churchIntro: Op[];
  hide: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [churchIntroState, setChurchIntroState] = useState([...churchIntro]);
  const [churchIntroEditor, setChurchIntroEditor] = useState<Quill | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    setChurchIntroState(churchIntro);
  }, [churchIntro]);

  useEffect(() => {
    if (!mounted || churchIntroEditor !== null) {
      return;
    }

    const delta = new Delta();
    for (const churchIntroOp of churchIntroState) {
      delta.ops.push(churchIntroOp);
    }

    const editor = new Quill("#church-intro-editor", {
      modules: {
        toolbar: true,
      },
      placeholder: "교회소개를 작성해주세요",
      theme: "snow",
    });
    editor.setContents(delta);
    editor.on("text-change", () => {
      setChurchIntroState([...editor.getContents().ops]);
    });
    setChurchIntroEditor(editor);
  }, [churchIntroEditor, churchIntroState, mounted]);

  const handleSubmit = () => {
    homepageTypeALocalStorageRepository.updateChurchIntro(churchIntroState);
    window.location.reload();
  };

  return (
    <div
      id="church-intro-edit-modal-component"
      className="modal-container edit-modal vertical-center"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-m font-weight-bold">교회소개 편집</h3>
          </div>
          <div className="modal__body">
            <div id="church-intro-editor"></div>

            <div style={{ paddingTop: 14 }}>
              <button
                className="button-4 width-100"
                type="button"
                onClick={handleSubmit}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
