import { ChurchResponse } from "@/api/smart-church/smart-church-api-response";

export default function Footer({ church }: { church: ChurchResponse }) {
  return (
    <footer>
      <div className="container" style={{ padding: "18px 22px" }}>
        <h3 style={{ marginBottom: 4 }}>{church.name}</h3>
        <div className="font-size-m">
          <p>{church.address}</p>
          <div className="d-flex align-items-center">
            <ul className="clearfix">
              <li className="col">
                <p>전화 {church.tel}</p>
              </li>
              <li className="col" style={{ marginLeft: 4, marginRight: 4 }}>
                <span style={{ color: "#ccc" }}>|</span>
              </li>
              <li className="col">
                <p>이메일 {church.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
