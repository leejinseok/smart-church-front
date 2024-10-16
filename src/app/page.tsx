import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";

export default async function Home() {
  return (
    <div id="main-page">
      <HomepageTypeA />
    </div>
  );
}
