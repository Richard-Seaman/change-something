import About from "../components/about/About";
import Privacy from "../components/privacy/Privacy";
import Contact from "../components/contact/Contact";
import Disclaimer from "../components/disclaimer/Disclaimer";
import PV from "../components/pv/PV";
import ListPledges from "../components/pledge/ListPledges";
import Home from "../components/home/Home";

export default [
  { path: "/contact", component: Contact },
  { path: "/disclaimer", component: Disclaimer },
  { path: "/privacy", component: Privacy },
  { path: "/about", component: About },
  { path: "/pledges", component: ListPledges },
  { path: "/pv", component: PV },
  { path: "/", component: Home }
];
