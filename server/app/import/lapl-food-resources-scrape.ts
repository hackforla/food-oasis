/* 
    Web Scraper - this example uses axios to get an HTML page (yes,
    axios can get other type of data besides json). Then it loads
    the HMTL into a cheerio-generated objct. cheerio uses a jquery-like
    syntax to find elements in the HTML and allows you to grab data
    for elements you find to extract data from a web site.

    In your web scraper, you will probably take the resulting data
    and show it on a web page or save it to a database. I am just showing
    how to get the data here for illustration purposes. 
    
    This technique
    only works when the page you are targeting returns static HTML (i.e.,
    it does not need to run javacript or make subsequent AJAX calls to
    get data for display).
*/

import * as cheerio from "cheerio";
import axios from "axios";
import { LAPLFoodResource } from "../../types/load-lapl-types";

const url = "https://www.lapl.org/homeless-resources-food";

/*
      This scraper scrapes the list items from the above url, 
      which is the list of organizations. With a bit more work,
      this program could also navigate to the detail pages to
      also get administrative phone numbers and a longer text
      description of the organization, if we decide that is 
      worthwhile.
*/

const selectAll = () => {
  return axios(url)
    .then((result: any) => {
      const $ = cheerio.load(result.data);
      const listings: LAPLFoodResource[] = [];
      $(".views-row").each((i, elem) => {
        const listingElement = $(elem);
        const name = listingElement.find("h3").text().trim();
        if (name) {
          const mapElement = listingElement.find("a.show-map-link");
          const dataLatitude = mapElement.attr("data-latitude");
          const lat =
            dataLatitude && Number.isNaN(Number.parseFloat(dataLatitude))
              ? Number.parseFloat(dataLatitude)
              : null;
          const dataLongitude = mapElement.attr("data-longitude");
          const lon =
            dataLongitude && Number.isNaN(Number.parseFloat(dataLongitude))
              ? Number.parseFloat(dataLongitude)
              : null;

          const addrPhone = listingElement.find("p:nth-child(3)").text();
          let addr = "";
          let phone = "";
          if (addrPhone) {
            const parts = addrPhone.split("|");
            addr = (parts[0] || "").trim();
            phone = (parts[1] || "").trim();
          }
          let populationServed = "";
          let resourceCategories = "";
          let generalResources = "";
          let additionalOfferings = "";
          // Next set of p tags - need to extract label from span to figure
          // out what each is, strip out <span> tag and contents from text
          // to get the corresponding property data.
          listingElement.find("p.hrc").each((i, infoElement) => {
            const label = $(infoElement)
              .find("span")
              .text()
              .trim()
              .toLowerCase();
            const text = $(infoElement).text().trim();
            if (label.includes("population")) {
              const pos = text.lastIndexOf(":") + 1;
              populationServed = text.substring(pos).trim();
            } else if (label.includes("categories")) {
              const pos = text.lastIndexOf(":") + 1;
              resourceCategories = text.substring(pos).trim();
            } else if (label.includes("general")) {
              const pos = text.lastIndexOf(":") + 1;
              generalResources = text.substring(pos).trim();
            } else if (label.includes("offerings")) {
              const pos = text.lastIndexOf(":") + 1;
              additionalOfferings = text.substring(pos).trim();
            }
          });

          const listing = {
            name,
            addr,
            lat,
            lon,
            phone,
            populationServed,
            resourceCategories,
            generalResources,
            additionalOfferings,
          };

          listings.push(listing);
        }
      });
      return listings;
    })
    .catch();
};

export default {
  selectAll,
};
