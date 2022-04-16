import axios from "axios";
import {toast} from "react-toastify";
import configFile from "../configFile.json";
import {localStorageService} from "./localStorage.service";

export const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint + "/auth"
})

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(async function (config) {
        const accessToken = localStorageService.getAccessToken();
        const refreshToken = localStorageService.getRefreshToken();
        const expiresDate = localStorageService.getTokenExpiresDate();
        // @ts-ignore
        const isExpired = refreshToken && expiresDate < Date.now();

        if (configFile.isFireBase) {
            // @ts-ignore
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                // @ts-ignore
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            // @ts-ignore
            if (isExpired) {
                const {data} = await httpAuth.post("/token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });

                localStorageService.setTokens({
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken,
                    expiresIn: data.expires_id,
                    userId: data.userId
                });
            }

            if (accessToken) {
                config.params = {...config.params, auth: accessToken};
            }
        } else {
            if (isExpired) {
                const {data} = await httpAuth.post("/token", {
                    refreshToken
                });
                localStorageService.setTokens({
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken,
                    expiresIn: data.expires_id,
                    userId: data.userId
                });
            }

            if (accessToken) {
                config.headers = {
                    ...config.params,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data: { [x: string]: any; }) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = {content: transformData(res.data)};
        }else {
            res.data = { content: res.data }
        }
        return res
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};
export default httpService;
