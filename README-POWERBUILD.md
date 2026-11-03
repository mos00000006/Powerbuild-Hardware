# PowerBuild website — GitHub patch

A new, original PowerBuild storefront with spacious home improvement retail styling, blue/yellow branding, an illustrated kitchen hero, departments, specials, product search, pagination, product details, local basket, branch selection and WhatsApp enquiries. No packages or database changes required.

## Apply using GitHub

1. Extract this ZIP on your computer.
2. In your existing **Maliks Hub** GitHub repository, upload the included `public/powerbuild` folder at the repository root. Keep the folder structure. Do not upload the ZIP itself as the website.
3. Commit and deploy using your current Hub workflow.
4. Open `/powerbuild/index.html` on the deployed Hub domain. Example path only: `https://YOUR-HUB-DOMAIN/powerbuild/index.html`.
5. The storefront reads `/api/ecommerce/public?channel=B2C` on that same domain. This is the public feed used in the previous PowerBuild Hub integration patch. **That endpoint must already exist and return the documented JSON. This ZIP does not install or replace it.** If it is missing, the site shows a retry message rather than fabricated products.
6. The official horizontal and diamond logos are included. Add your WhatsApp number in `public/powerbuild/config.js`, or let the WhatsApp number come from the Hub's `settings.support_whatsapp`. The header uses your supplied horizontal logo; the footer uses your supplied diamond logo. Both original PNG files are preserved.

Alternative, for Git users: apply the separate `powerbuild-website.patch` from the repository root using `git apply --check powerbuild-website.patch` followed by `git apply powerbuild-website.patch`. Choose file upload OR git apply, not both.

This is an additive patch. It does not replace `app/page.tsx`, existing `/shop` routes, Hub menus, authentication, API handlers or database tables. Roll back by removing `public/powerbuild`.

## Hub connection

Default: same origin. Leave `hubOrigin: ''` in config. Product image paths from the Hub resolve against the Hub origin. Search/category/page queries are sent to the feed; data is reloaded on search, navigation and returning to the tab after 30 seconds. This is fetch-based refresh, not a pushed real-time connection.

Separate website/repository: copy the **contents** of `public/powerbuild` into that site's published static directory. Set `hubOrigin` to the Hub's HTTPS origin in config.js. The Hub must allow public GET requests from that site's exact origin on the catalogue endpoint (CORS) and permit access to the public product/special images. This patch does not configure CORS, a domain, Cloudflare Access or hosting. Never put private API keys or admin credentials in config.js. Keep Hub/admin routes restricted. Review which products your current feed publishes before opening it publicly.

If the public site must open at `/` on its own domain, use the separate static-site deployment described above. This patch intentionally leaves the Hub homepage in place.

## Expected public feed

```json
{
  "products": [{"id":1,"code":"SKU","name":"Product","description":"Details","category":"Tiles","image_url":"/api/ecommerce/product-image/1","price":129.99,"price_basis":"incl VAT","unit":"EA","stock_status":"Available","featured":false}],
  "total":1,"page":1,"pages":1,
  "categories":["Tiles"],"branches":["Store name"],"specials":[],
  "settings":{"support_whatsapp":"27..."}
}
```

Specials use `{id,title,images:[{id,url}]}`. Request parameters are `channel=B2C`, `page`, `pageSize=24`, `q` and `category`. Prices of zero are displayed as price on request. `stock_status: "Unavailable"` disables adding that product. All displayed prices and stock come from the feed; the site does not invent availability or promotions. Branch names come from the feed; addresses, hours and maps are not supplied by this endpoint.

## Enquiries

The basket is stored in the visitor's browser and contains saved price estimates. It does not reserve stock or create a Hub order. WhatsApp opens a prepared enquiry for the visitor to send; no message is sent automatically. If a WhatsApp number is missing, the visitor can copy the enquiry. Payment processing and confirmed checkout are not included.

## Validation performed

- JavaScript syntax checks passed for app.js and config.js.
- Desktop browser: layout, catalogue error/retry state and product/department/branch rendering checked.
- Using a temporary local JSON fixture: add-to-basket, quantity increase, estimated totals and missing WhatsApp fallback checked. Fixture was removed before packaging.
- Responsive CSS included for mobile; no live mobile device test performed.
- Your repository build, production API, domain and Access configuration could not be tested from this source-only patch. After deployment verify search, categories, page navigation, specials, images and enquiries against the live Hub.
