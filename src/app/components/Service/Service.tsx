import { Service as ServiceResponse } from "@/api/smart-church/smart-church-api-response";
import "./Service.scss";

const ServiceType = {
  SERVICE: "예배",
};

export default function Service({ service }: { service: ServiceResponse }) {
  return (
    <div id="service-component">
      <h3 style={{ marginBottom: 16 }}>예배</h3>

      <table className="font-size-l">
        <thead>
          <tr>
            <th>구분</th>
            <th>시간</th>
            <th>장소</th>
          </tr>
        </thead>
        <tbody>
          {service.items.map((item, itemIndex) => {
            return (
              <tr key={itemIndex}>
                <td>{item.title}</td>
                <td>{item.time}</td>
                <td>{item.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
