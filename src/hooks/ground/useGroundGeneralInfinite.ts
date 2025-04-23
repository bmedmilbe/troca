import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { ResponseA } from "../../services/api-client";

export interface QueryParamsClient {
  boss?: number;
  is_charge?: boolean;
  deliver?: number;
  completed?: boolean;
  completed_by?: number;
  friend?: number;
  friend_paid?: boolean;
  search?: string;
}

const useGroundGeneralInfinite = <T>(
  endpoint: string,
  queryKey: any[]
  // query_params: QueryParamsClient
) => {
  const getPageNumber = (url: string) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const page = urlParams.get("page");
    return page ? parseInt(page, 10) : null;
  };
  const apiClient = new ApiClient<T>(`ground/${endpoint}`);
  return useInfiniteQuery<ResponseA<T>>({
    queryFn: ({ pageParam = 0 }) => {
      // console.log(pageParam);
      return apiClient.getAllSecond({
        params: {
          // ...query_params,
          limit: 10,
          offset: pageParam * 10,
          page: pageParam || undefined,
        },
      });
    },
    queryKey: queryKey,
    getNextPageParam: (lastPage, allPage) => {
      // return 3;
      // console.log(allPage.length % 10);
      //check if no next page in last page
      // console.log(lastPage);
      // return 1;

      // let count = 0;
      // allPage.map((p) => (count = count + p.results.length));
      // return count != lastPage.count ? allPage.length : undefined;
      // console.log(
      //   lastPage.next.includes("page")
      //     ? getPageNumber(lastPage.next)
      //     : undefined
      // );
      return lastPage.next?.includes("page")
        ? getPageNumber(lastPage.next)
        : undefined;
    },
  });
};

export default useGroundGeneralInfinite;
