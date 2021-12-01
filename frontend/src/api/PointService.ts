import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPoint} from "../models/IPoint";
import {useAppSelector} from "../hooks/redux";

const baseUrl = "http://localhost:8080";

export const pointAPI = createApi({
    reducerPath: "pointAPI",
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Authorization", `Bearer ${localStorage.getItem("authToken")}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        fetchAllPoints: build.query<IPoint[], string>({
            query: () => ({
                url: "/model/points"
            }),
            providesTags: result => ['Post']
        }),
        fetchNewRadiusPoints: build.query<IPoint[], string>({
            query: (r) => ({
                url: `/model/points/graph?r=${Number(r)}`
            }),
            providesTags: result => ['Post']
        }),
        submitNewPoint: build.mutation<IPoint, IPoint>({
            query: (post) => ({
                url: "/model/points",
                method: "POST",
                body: post
            }),
            invalidatesTags: ['Post']
        })
    })
})