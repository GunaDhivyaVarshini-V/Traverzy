const navBar = [
  { id: "homeID", name: "Home", href: "/Frontend/pages/home.html" },
  { id: "packagesID", name: "Packages", href: "/Frontend/pages/packages.html" },
  { id: "offerID", name: "Offers", href: "#Offers" },
  { id: "contactID", name: "Contact", href: "#contact" }
];

const packageData = [
  {
    image: "http://localhost:5500/Frontend/images/goa.jpg",
    title: "Lake Como, Italy",
    duration: "5 days 4 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 5,
    month: "JFM",
    budget: 20000
  },
  {
    image: "http://localhost:5500/Frontend/images/group1.jpg",
    title: "Bali Group Tour",
    duration: "6 days 5 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 6,
    month: "AMJ",
    budget: 25000
  },
  {
    image: "http://localhost:5500/Frontend/images/group2.webp",
    title: "Swiss Alps Adventure",
    duration: "7 days 6 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 7,
    month: "JAS",
    budget: 48000
  },
  {
    image: "http://localhost:5500/Frontend/images/group3.jpg",
    title: "Maldives Honeymoon",
    duration: "4 days 3 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 4,
    month: "OND",
    budget: 55000
  },
  {
    image: "http://localhost:5500/Frontend/images/hero-place2.jpg",
    title: "Goa Beach Fun",
    duration: "5 days 4 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 9,
    month: "JFM",
    budget: 10000
  },
  {
    image: "http://localhost:5500/Frontend/images/hero-place1.jpg",
    title: "Kerala Backwaters",
    duration: "6 days 5 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 12,
    month: "JFM",
    budget: 30000
  },
  {
    image: "http://localhost:5500/Frontend/images/hero-place1.jpg",
    title: "Short Kerala Getaway",
    duration: "3 days 2 nights",
    link: "/Frontend/Pages/destinations.html",
    days: 3,
    month: "JFM",
    budget: 9000
  }
];

module.exports = {
  navBar,
  packageData
};
