import "./ChurchDepartment.scss";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";
import { useState } from "react";
import ChurchDepartmentEditModal from "./ChurchDepartmentEditModal/ChurchDepartmentEditModal";
import { ChurchDepartmentsAndMinisties } from "../../../../type/homepage/homepage-type-a";

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

  return (
    <div id="church-department-component">
      <h3
        className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold ${isEdit && "edit-tools-container"}`}
      >
        {churchDepartmentsAndMinistriesState.title}
        <HomepageEditTools
          visibilitlyControl={false}
          handleClick={() => setChurchDepartmentEditModalVisible(true)}
        />
      </h3>

      <div>
        {churchDepartmentsAndMinistries.items?.map(
          (department, departmentIndex) => {
            return (
              <div key={departmentIndex} className="church-department">
                <p className="font-size-m font-weight-bold department-name">
                  {department.name}
                </p>
                <p className="font-size-m">{department.description}</p>
              </div>
            );
          },
        )}
      </div>

      {churchDepartmentEditModalVisible && (
        <ChurchDepartmentEditModal
          updateChurchDepartment={(value) =>
            setChurchDepartmentsAndMinistries(value)
          }
          churchDepartmentsAndMinistries={churchDepartmentsAndMinistriesState}
          hide={() => setChurchDepartmentEditModalVisible(false)}
        />
      )}
    </div>
  );
}
