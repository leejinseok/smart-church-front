import "./ChurchDepartment.scss";
import { nanumBarunGothicBold } from "../../../layout";
import { useEffect, useState } from "react";
import ChurchDepartmentEditModal from "./ChurchDepartmentEditModal/ChurchDepartmentEditModal";
import { ChurchDepartmentsAndMinisties } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import InvisibleContentGuide from "../../InvisibleContentGuide/InvisibleContentGuide";

export default function ChurchDepartment({
  isEdit,
  churchDepartmentsAndMinistries,
}: {
  isEdit: boolean;
  churchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties;
}) {
  const [
    churchDepartmentEditModalVisible,
    setChurchDepartmentEditModalVisible,
  ] = useState(false);

  const [
    churchDepartmentsAndMinistriesState,
    setChurchDepartmentsAndMinistries,
  ] = useState({ ...churchDepartmentsAndMinistries });

  useEffect(() => {
    if (churchDepartmentEditModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [churchDepartmentEditModalVisible]);

  return (
    <>
      {churchDepartmentsAndMinistriesState.visible ? (
        <div
          id="church-department-component"
          className={`${isEdit && "edit-overlay-container"}`}
        >
          <>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
            >
              {churchDepartmentsAndMinistriesState.title}
            </h3>

            <div>
              {churchDepartmentsAndMinistriesState.items?.map(
                (department, departmentIndex) => {
                  return (
                    <div key={departmentIndex} className="church-department">
                      <p className="font-size-m font-weight-bold department-name">
                        {department.name}
                      </p>
                      <p className="font-size-m break-spaces">
                        {department.description}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </>

          {isEdit && (
            <HomepageEditOverlay
              onClickListener={() => {
                setChurchDepartmentEditModalVisible(true);
              }}
            />
          )}
        </div>
      ) : (
        isEdit && (
          <InvisibleContentGuide
            text="사역 및 부서소개는 미공개 처리 되었습니다."
            onClick={() => {
              setChurchDepartmentEditModalVisible(true);
            }}
          />
        )
      )}

      {/* 편집 modal */}
      {isEdit && churchDepartmentEditModalVisible && (
        <ChurchDepartmentEditModal
          updateChurchDepartment={(value) =>
            setChurchDepartmentsAndMinistries(value)
          }
          churchDepartmentsAndMinistries={churchDepartmentsAndMinistriesState}
          hide={() => setChurchDepartmentEditModalVisible(false)}
        />
      )}
    </>
  );
}
