import config from "./config";

let allCompanies;

export function load(callback) {
  fetch(`${config.spreadsheetUrl}?key=${config.spreadsheetApiKey}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const data = response.values || [];

      allCompanies = data.map((company) => {
        let name = company[0],
          url = company[1],
          size = company[2],
          services = company[3]
            .split(",")
            .map(item => item.trim())
            .sort(),
          twitter = company[4] || "";

        return {
          name,
          url,
          size,
          services,
          twitter
        };
      });

      const displayCompanies = allCompanies;

      callback({ companies: allCompanies, displayCompanies });
    });
}

export { allCompanies };
