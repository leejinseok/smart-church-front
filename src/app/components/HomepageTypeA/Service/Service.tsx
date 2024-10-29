import { WorshipServicesAndMeetingsInformationGroup } from "../../../../type/homepage/homepage-type-a";
import "./Service.scss";

export default function Service({
  service,
}: {
  service: WorshipServicesAndMeetingsInformationGroup;
}) {
  return (
    <div id="service-component">
      <h3 style={{ marginBottom: 16 }} className="font-size-m">
        예배
      </h3>

      <table className="font-size-m">
        <thead>
          <tr>
            <th>구분</th>
            <th>시간</th>
            <th className="location">장소</th>
          </tr>
        </thead>
        <tbody>
          {service.items.map((item, itemIndex) => {
            return (
              <tr key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.time}</td>
                <td className="location">{item.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
