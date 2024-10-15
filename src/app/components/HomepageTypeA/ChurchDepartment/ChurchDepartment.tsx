import "./ChurchDepartment.scss";
import { ChurchDepartment as ChurchDepartmentInterface } from "../../../../api/smart-church/smart-church-api-response";

export default function ChurchDepartment({
  departments,
}: {
  departments: ChurchDepartmentInterface[];
}) {
  return (
    <div id="church-department-component">
      {departments.map((department, departmentIndex) => {
        return (
          <div key={departmentIndex} className="church-department">
            <p className="font-size-l font-weight-bold department-name">
              {department.name}
            </p>
            <p className="font-size-l">{department.description}</p>
          </div>
        );
      })}
    </div>
  );
}
