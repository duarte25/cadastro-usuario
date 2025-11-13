import { createURLSearch } from "../../utils/createURLSearch";
import { getCookie } from "@/actions/handleCookie";
import { FetchApiProps } from "../../types/api";

export const getApiUrlEnv = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL;
  } else {
    return process.env.API_URL;
  }
};

export interface ApiErrorQuery {
  message: string;
  errors: string[];
  code: number;
}

export async function fetchUseQuery<RequestData, ResponseData>({
  route,
  method,
  data,
  token,
  nextOptions,
}: FetchApiProps<RequestData | FormData>): Promise<ResponseData> {

  let bearerToken = token || undefined;

  if (!bearerToken && typeof window === "undefined") {
    const token = await getCookie("accessToken");
    bearerToken = token?.value;
  }

  const urlApi = getApiUrlEnv();
  let body: BodyInit | null = null;

  // Se for GET, transformar os parâmetros em query string
  if (method === "GET" && data) {
    let urlSearch;
    if (!(data instanceof FormData)) {
      urlSearch = createURLSearch({ route: route, data: { querys: data } });
      route = urlSearch || route;
    }
    route = urlSearch || route;
    body = null;
  } else if (method !== "GET" && data) {
    // Verifica se o dado é um FormData ou JSON
    body = data instanceof FormData ? data : JSON.stringify(data);
  }

  // Headers padrão
  const headers: HeadersInit = {
    Authorization: `Bearer ${bearerToken}`,
    accept: "application/json",
  };

  // Apenas adiciona "Content-Type" se NÃO for FormData
  if (data && !(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${urlApi}${route}`, {
    method: method,
    headers: headers,
    body: body,
    next: nextOptions,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok || json.error) {
    const error: ApiErrorQuery = {
      message: json.message || "Erro desconhecido",
      errors: json.errors || [],
      code: response.status,
    };
    throw error;
  }

  // Agora retornamos apenas os dados da API diretamente
  return json.data as ResponseData;
}