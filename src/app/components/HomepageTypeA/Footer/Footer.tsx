import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";

export default function Footer({ church }: { church: ChurchResponse }) {
  return (
    <footer>
      <div className="container" style={{ padding: "18px 22px" }}>
        <h3 style={{ marginBottom: 4 }}>{church.name}</h3>
        <div className="font-size-m">
          <p>{church.address}</p>
          <div className="d-flex align-items-center">
            <ul className="clearfix">
              {church.tel && (
                <li className="col">
                  <p>전화 {church.tel}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
