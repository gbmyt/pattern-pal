import { authorizedUser } from "@/const/app.const";
import { fetchRavelryData } from "@/lib/apiHandlers";

export const GET = async (req: Request) => {
    const data = await fetchRavelryData(`/projects/${authorizedUser}/list.json`);
    return data;
}
