require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-route.js").default;
const Sitemap = require("react-router-sitemap").default;

const generateSitemap = (path) =>
  new Sitemap(router).build("https://db-online.kro.kr").save(path);

generateSitemap("./public/sitemap.xml");
generateSitemap("./public/sitemap-index.xml");
