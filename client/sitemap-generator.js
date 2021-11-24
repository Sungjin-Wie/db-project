require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-route.js").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://db-online.kro.kr")
    .save("./public/sitemap.xml");
}

generateSitemap();
