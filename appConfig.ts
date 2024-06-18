import dotenv from "dotenv";

export const AppEnv = {
  STG: "STAGING",
  PROD: "PRODUCTION",
};
dotenv.config({
  // path: `./.env.development`,
  path: `./.env.${process.env.NODE_ENV}`,
});

export const domain = process.env.NEXT_PUBLIC_BASE_URL_DOMAIN || "http://localhost:3000/api/";
// const appEnv = AppEnv.STG;

// const ConfigurationProd = {
//   // BASE_URL: "http://43.205.53.146/api/",
//   BASE_URL: `${domain}/api/`,
//   // BASE_URL: "http://localhost:3000/api/",
// };

// const ConfigurationStaging = {
//   // BASE_URL: "http://43.205.53.146/api/",
//   BASE_URL: `${domain}/api/`,
//   // BASE_URL: "http://3.6.205.109:4000/api/",
// };

// const Config =
//   appEnv === AppEnv.PROD ? ConfigurationProd : ConfigurationStaging;

// export const AppConfig = {
//   appEnv,
//   Config,
// };

export const BASEURL = `${domain}/api/`;