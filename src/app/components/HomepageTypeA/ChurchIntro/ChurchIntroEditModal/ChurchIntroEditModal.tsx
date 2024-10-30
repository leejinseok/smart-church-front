import "./ChurchIntroEditModal.scss";

import { useEffect, useState } from "react";
import { homepageTypeALocalStorageRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-localstorage-repository";
import { ChurchIntro } from "../../../../../type/homepage/homepage-type-a";
import Quill from "quill";
import { getCookie } from "../../../../../util/cookie-utils";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";

export default function ChurchIntroEditModal({
  churchIntro,
  hide,
}: {
  churchIntro: ChurchIntro;
  hide: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [churchIntroState, setChurchIntroState] = useState({ ...churchIntro });
  const [churchIntroEditor, setChurchIntroEditor] = useState<Quill | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // useEffect(() => {
  //   setChurchIntroState(churchIntro);
  // }, [churchIntro]);

  useEffect(() => {
    if (!mounted || churchIntroEditor !== null) {
      return;
    }

    import("quill").then((quill) => {
      const editor = new quill.default("#church-intro-editor", {
        modules: {
          toolbar: true,
        },
        placeholder: "교회소개를 작성해주세요",
        theme: "snow",
      });

      import("quill/core").then((quillCore) => {
        const delta = new quillCore.Delta();
        for (const churchIntroOp of churchIntroState.contents) {
          delta.ops.push(churchIntroOp);
        }
        editor.setContents(delta);
        editor.on("text-change", () => {
          setChurchIntroState((prev) => ({
            ...prev,
            contents: editor.getContents().ops,
          }));
        });
      });

      setChurchIntroEditor(editor);
    });
  }, [churchIntroEditor, churchIntroState, mounted]);

  const handleSubmit = () => {
    const homepageTypeAId = getCookie("homepageTypeAId");
    if (!homepageTypeAId) {
      return;
    }

    homepageTypeAApiRepository.updateChurchIntro(
      homepageTypeAId,
      churchIntroState,
    );
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
            <h3 className="font-size-l font-weight-bold">교회소개 편집</h3>
          </div>
          <div className="modal__body">
            <div className="form-group">
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 10 }}
              >
                제목
              </p>
              <input
                type="text"
                className="font-size-m no-border"
                value={churchIntroState.title}
                onChange={(e) =>
                  setChurchIntroState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 10 }}
              >
                내용
              </p>
              <div id="church-intro-editor"></div>
            </div>

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
