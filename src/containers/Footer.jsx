export default function Footer() {

  return <div id="copyright">
    <p>Data source: <a
      href={"https://korona.gov.sk"} target={"_blank"} rel={"noreferrer"}>korona.gov.sk</a> &nbsp; &copy; {new Date().getFullYear()} Copyright: Cyril Gavala
    </p>
  </div>
}